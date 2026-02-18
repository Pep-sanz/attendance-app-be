import prisma from "../../lib/prisma";
import { calculateLeaveDays } from "../../utils/leave";

export const getLeaveCategories = async (companyId: string) => {
  return prisma.leaveCategory.findMany({
    where: { company_id: companyId },
  });
};

export const createLeaveRequest = async (
  user_id: string,
  data: {
    category_id: string;
    start_date: string;
    end_date: string;
    reason?: string;
  }
) => {
  const startDate = new Date(data.start_date);
  const endDate = new Date(data.end_date);
  const totalDays = calculateLeaveDays(startDate, endDate);

  // Ambil kategori cuti
  const category = await prisma.leaveCategory.findUnique({
    where: { id: data.category_id },
  });

  if (!category) throw new Error("Leave category not found");

  // Hitung semua cuti approved tahun ini
  const yearStart = new Date(startDate.getFullYear(), 0, 1);
  const yearEnd = new Date(startDate.getFullYear(), 11, 31);

  const approvedLeaves = await prisma.leaveRequest.findMany({
    where: {
      user_id,
      category_id: data.category_id,
      status: "APPROVED",
      start_date: {
        gte: yearStart,
        lte: yearEnd,
      },
    },
  });

  // Hitung hari yang sudah dipakai
  const usedDays = approvedLeaves.reduce((acc, leave) => {
    return acc + calculateLeaveDays(leave.start_date, leave.end_date);
  }, 0);

  // Validasi kuota
  if (usedDays + totalDays > category.quota_days) {
    throw new Error("Leave quota exceeded");
  }

  // Buat request cuti
  return prisma.leaveRequest.create({
    data: {
      user_id,
      category_id: data.category_id,
      start_date: startDate,
      end_date: endDate,
      reason: data.reason,
      status: "PENDING",
    },
  });
};

export const getMyLeaveRequests = async (user_id: string) => {
  return prisma.leaveRequest.findMany({
    where: { user_id },
    orderBy: { created_at: "desc" },
    include: {
      category: true,
    },
  });
};
