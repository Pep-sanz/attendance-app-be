import { differenceInMinutes } from "date-fns";
import prisma from "../../lib/prisma";
import { calculateDistanceMeters } from "../../utils/calculateDistanceMeters";

const calculateStatus = (
  check_in: Date | null,
  shift: any,
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
  data: any,
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
