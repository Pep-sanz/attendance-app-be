import prisma from "../../lib/prisma";

export const createShift = async (company_id: string, data: any) => {
  return prisma.shift.create({
    data: {
      ...data,
      company_id,
    },
  });
};

export const listShifts = async (company_id: string) => {
  return prisma.shift.findMany({
    where: {
      company_id,
      is_active: true,
    },
    orderBy: {
      created_at: "asc",
    },
  });
};

export const updateShift = async (
  id: string,
  company_id: string,
  data: any
) => {
  return prisma.shift.updateMany({
    where: { id, company_id },
    data,
  });
};

export const deleteShift = async (id: string, company_id: string) => {
  return prisma.shift.updateMany({
    where: { id, company_id },
    data: { is_active: false },
  });
};

export const assignShiftToEmployee = async (
  employee_id: string,
  shift_id: string,
  company_id: string
) => {
  return prisma.employee.updateMany({
    where: {
      id: employee_id,
      company_id,
    },
    data: {
      shift_id,
    },
  });
};
