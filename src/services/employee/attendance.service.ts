import { differenceInMinutes } from "date-fns";
import prisma from "../../lib/prisma";
import { calculateDistanceMeters } from "../../utils/calculateDistanceMeters";

const calculateStatus = (
  check_in: Date | null,
  shift: any
): "PRESENT" | "LATE" | "ABSENT" => {
  if (!check_in) return "ABSENT";

  const [startHour, startMinute] = shift.start_time.split(":").map(Number);
  const shiftStart = new Date(check_in);
  shiftStart.setHours(startHour, startMinute, 0, 0);

  const lateToleranceMinutes = shift.late_tolerance ?? 0;

  const diffMinutes = differenceInMinutes(check_in, shiftStart);

  if (diffMinutes <= lateToleranceMinutes) {
    return "PRESENT";
  }

  return "LATE";
};

const MAX_RADIUS = 150;

const calculateWorkMinutes = (checkIn: Date, checkOut: Date): number => {
  const minutes = differenceInMinutes(checkOut, checkIn);

  if (minutes < 0) {
    throw new Error("Invalid check-out time");
  }

  // safety guard: max 24 jam
  if (minutes > 1440) {
    throw new Error("Work duration exceeds 24 hours");
  }

  return minutes;
};

export const checkIn = async (user_id: string, lat: number, lng: number) => {
  const today = new Date().toDateString();

  const company = await prisma.company.findFirst({
    where: {
      employees: {
        some: { user_id },
      },
    },
  });

  if (!company) throw new Error("Company not found");

  if (!company.latitude || !company.longitude) {
    throw new Error("Company office location not set");
  }

  const distance = calculateDistanceMeters(
    lat,
    lng,
    company.latitude,
    company.longitude
  );

  if (distance > MAX_RADIUS) {
    throw new Error(`Check-in too far from office (${distance} meters)`);
  }

  return prisma.attendance.create({
    data: {
      user_id,
      date: new Date(today),
      check_in: new Date(),
      check_in_lat: lat,
      check_in_lng: lng,
      distance_meter: distance,
      status: "PRESENT",
    },
  });
};

export const checkOut = async (user_id: string, lat?: number, lng?: number) => {
  const today = new Date().toDateString();

  const attendance = await prisma.attendance.findFirst({
    where: {
      user_id,
      date: new Date(today),
    },
  });

  if (!attendance || !attendance.check_in) {
    throw new Error("You have not checked in");
  }

  if (attendance.check_out) {
    throw new Error("Already checked out");
  }

  const now = new Date();
  const work_minutes = calculateWorkMinutes(now, attendance.check_in);

  return prisma.attendance.update({
    where: { id: attendance.id },
    data: {
      check_out: now,
      check_out_lat: lat,
      check_out_lng: lng,
      work_minutes,
    },
  });
};

export const listAttendance = async (company_id: string, query: any) => {
  const { page = 1, limit = 10, user_id, start_date, end_date } = query;

  return prisma.attendance.findMany({
    where: {
      user_id: user_id || undefined,
      date: {
        gte: start_date ? new Date(start_date) : undefined,
        lte: end_date ? new Date(end_date) : undefined,
      },
      user: {
        employee: {
          company_id: company_id,
        },
      },
    },
    include: {
      user: {
        include: {
          employee: true,
        },
      },
    },
    orderBy: {
      date: "desc",
    },
    skip: (Number(page) - 1) * Number(limit),
    take: Number(limit),
  });
};

export const attendanceDetail = async (company_id: string, id: string) => {
  return prisma.attendance.findFirst({
    where: {
      id,
      user: {
        employee: {
          company_id: company_id,
        },
      },
    },
    include: {
      user: {
        include: {
          employee: true,
        },
      },
    },
  });
};

export const updateAttendance = async (
  company_id: string,
  id: string,
  data: any
) => {
  let status = data.status;

  // Jika admin tidak isi status, hitung otomatis jika check_in berubah
  if (!status && data.check_in) {
    const attendance = await prisma.attendance.findFirst({
      where: { id },
      include: {
        user: {
          include: {
            employee: {
              include: { shift: true },
            },
          },
        },
      },
    });

    const shift = attendance?.user?.employee?.shift;
    if (shift) {
      status = calculateStatus(new Date(data.check_in), shift);
    }
  }

  return prisma.attendance.updateMany({
    where: {
      id,
      user: { employee: { company_id } },
    },
    data: {
      ...data,
      status,
    },
  });
};

export const deleteAttendance = async (company_id: string, id: string) => {
  return prisma.attendance.deleteMany({
    where: {
      id,
      user: {
        employee: {
          company_id: company_id,
        },
      },
    },
  });
};

export const getEmployeeAttendanceHistory = async ({
  user_id,
  start_date,
  end_date,
}: {
  user_id: string;
  start_date?: Date;
  end_date?: Date;
}) => {
  const filters: any = {
    user_id,
  };

  if (start_date && end_date) {
    filters.date = {
      gte: start_date,
      lte: end_date,
    };
  }

  const records = await prisma.attendance.findMany({
    where: filters,
    orderBy: { date: "desc" },
    include: {
      shift: true,
    },
  });

  return records.map((record) => {
    const workMinutes =
      record.check_in && record.check_out
        ? differenceInMinutes(record.check_out, record.check_in)
        : 0;

    return {
      id: record.id,
      date: record.date,
      status: record.status,
      check_in: record.check_in,
      check_out: record.check_out,
      shift: record.shift
        ? {
            name: record.shift.name,
            start: record.shift.start_time,
            end: record.shift.end_time,
          }
        : null,
      work_minutes: workMinutes,
      work_hours: (workMinutes / 60).toFixed(2),
    };
  });
};
