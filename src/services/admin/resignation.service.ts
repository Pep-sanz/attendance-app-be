import prisma from "../../lib/prisma";

interface ResignQuery {
  status?: string;
  page?: number;
  limit?: number;
  user_id?: string;
}

export const listResignationRequests = async (
  company_id: string,
  query: ResignQuery,
) => {
  const { status, page = 1, limit = 10, user_id } = query;

  const where: any = {
    user: {
      employee: {
        company_id,
      },
    },
  };

  if (status) where.status = status;
  if (user_id) where.user_id = user_id;

  const total = await prisma.resignation.count({ where });

  const data = await prisma.resignation.findMany({
    where,
    skip: (Number(page) - 1) * Number(limit),
    take: Number(limit),
    orderBy: { created_at: "desc" },
    include: {
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

export const approveResignation = async (id: string, admin_id: string) => {
  const resignation = await prisma.resignation.update({
    where: { id },
    data: {
      status: "APPROVED",
    },
    include: {
      user: {
        include: {
          employee: true,
        },
      },
    },
  });

  // Update status employee juga
  await prisma.employee.update({
    where: { user_id: resignation.user_id },
    data: { status: "RESIGNED" },
  });

  // Optional: update status user juga
  await prisma.user.update({
    where: { id: resignation.user_id },
    data: { role: "EMPLOYEE" },
  });

  return resignation;
};

export const rejectResignation = async (id: string, admin_id: string) => {
  return prisma.resignation.update({
    where: { id },
    data: {
      status: "REJECTED",
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
