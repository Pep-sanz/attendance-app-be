import prisma from "../../lib/prisma";

export const createLeaveCategory = async (
  companyId: string,
  data: {
    name: string;
    quota_days: number;
    expires_at: string;
  }
) => {
  const category = await prisma.leaveCategory.create({
    data: {
      company_id: companyId,
      name: data.name,
      quota_days: data.quota_days,
      expires_at: new Date(data.expires_at),
    },
  });

  const employees = await prisma.employee.findMany({
    where: { company_id: companyId },
  });

  await prisma.$transaction(
    employees.map((emp) =>
      prisma.employeeLeaveBalance.create({
        data: {
          employee_id: emp.id,
          category_id: category.id,
          remaining_days: category.quota_days,
        },
      })
    )
  );

  return category;
};

export const getLeaveCategories = async (companyId: string) => {
  return prisma.leaveCategory.findMany({
    where: { company_id: companyId },
  });
};

export const updateLeaveCategory = async (id: string, data: any) => {
  return prisma.leaveCategory.update({
    where: { id },
    data,
  });
};

export const deleteLeaveCategory = async (id: string) => {
  return prisma.leaveCategory.delete({
    where: { id },
  });
};
