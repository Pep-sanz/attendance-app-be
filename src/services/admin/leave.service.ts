import prisma from "../../lib/prisma";
import { calculateLeaveDays } from "../../utils/leave";

interface LeaveQuery {
  status?: string;
  user_id?: string;
  category_id?: string;
  start_date?: string;
  end_date?: string;
  page?: number;
  limit?: number;
}

export const listLeaveRequests = async (
  company_id: string,
  query: LeaveQuery,
) => {
  const {
    status,
    user_id,
    category_id,
    start_date,
    end_date,
    page = 1,
    limit = 10,
  } = query;

  const where: any = {
    user: {
      employee: {
        company_id,
      },
    },
  };

  if (status) where.status = status;
  if (user_id) where.user_id = user_id;
  if (category_id) where.category_id = category_id;

  if (start_date || end_date) {
    where.start_date = {};
    if (start_date) where.start_date.gte = new Date(start_date);
    if (end_date) where.start_date.lte = new Date(end_date);
  }

  const total = await prisma.leaveRequest.count({ where });

  const data = await prisma.leaveRequest.findMany({
    where,
    orderBy: { created_at: "desc" },
    skip: (Number(page) - 1) * Number(limit),
    take: Number(limit),
    include: {
      category: true,
      user: {
        include: {
          employee: true,
        },
      },
    },
  });

  return {
    data,
    pagination: {
      total,
      page: Number(page),
      limit: Number(limit),
      total_pages: Math.ceil(total / Number(limit)),
    },
  };
};

export const approveLeaveRequest = async (
  request_id: string,
  admin_id: string,
) => {
  const leave = await prisma.leaveRequest.findUnique({
    where: { id: request_id },
    include: { category: true },
  });

  if (!leave) throw new Error("Leave request not found");
  if (leave.status !== "PENDING")
    throw new Error("Leave request already processed");

  const totalDays = calculateLeaveDays(leave.start_date, leave.end_date);

  // Ambil saldo cuti employee
  const balance = await prisma.employeeLeaveBalance.findUnique({
    where: {
      employee_id_category_id: {
        employee_id: leave.user_id,
        category_id: leave.category_id,
      },
    },
  });

  if (!balance) throw new Error("Employee leave balance not found");

  if (balance.remaining_days < totalDays)
    throw new Error("Insufficient leave balance");

  return prisma.$transaction([
    // Update status request
    prisma.leaveRequest.update({
      where: { id: request_id },
      data: {
        status: "APPROVED",
        approved_by: admin_id,
        approved_at: new Date(),
      },
    }),

    // Kurangi saldo
    prisma.employeeLeaveBalance.update({
      where: { id: balance.id },
      data: {
        remaining_days: balance.remaining_days - totalDays,
      },
    }),
  ]);
};

export const rejectLeaveRequest = async (
  request_id: string,
  admin_id: string,
  reason?: string,
) => {
  const leave = await prisma.leaveRequest.findUnique({
    where: { id: request_id },
  });

  if (!leave) throw new Error("Leave request not found");
  if (leave.status !== "PENDING")
    throw new Error("Leave request already processed");

  return prisma.leaveRequest.update({
    where: { id: request_id },
    data: {
      status: "REJECTED",
      approved_by: admin_id,
      approved_at: new Date(),
      reason: reason || null,
    },
  });
};
