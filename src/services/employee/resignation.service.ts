import prisma from "../../lib/prisma";

export const createEmployeeResignation = async (
  user_id: string,
  data: {
    last_working_date: string;
    reason?: string;
  },
) => {
  // Cek apakah user sudah punya permintaan resign
  const existing = await prisma.resignation.findUnique({
    where: { user_id },
  });

  if (existing) {
    throw new Error("You already submitted a resignation request");
  }

  // Pastikan user adalah employee aktif
  const employee = await prisma.employee.findUnique({
    where: { user_id },
  });

  if (!employee) {
    throw new Error("Employee record not found");
  }

  if (employee.status === "RESIGNED") {
    throw new Error("You are already resigned");
  }

  return prisma.resignation.create({
    data: {
      user_id,
      last_working_date: new Date(data.last_working_date),
      reason: data.reason,
      status: "PENDING",
    },
  });
};

export const getMyResignation = async (user_id: string) => {
  return prisma.resignation.findUnique({
    where: { user_id },
  });
};
