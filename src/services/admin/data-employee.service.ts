import prisma from "../../lib/prisma";
import bcrypt from "bcryptjs";
import { generateDefaultPassword } from "../../utils/password";
import { sendEmployeeDefaultPasswordEmail } from "../../lib/email-send-password";

export const createEmployee = async (data: any) => {
  const defaultPassword = generateDefaultPassword(6);
  const hashedPassword = await bcrypt.hash(defaultPassword, 10);

  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existingUser) {
    throw new Error("Email sudah terdaftar pada sistem");
  }

  const employee = await prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        email: data.email,
        name: data.name,
        photo: data.photo,
        role: "EMPLOYEE",
        company_id: data.company_id,
        password: hashedPassword,
      },
    });

    const createdEmployee = await tx.employee.create({
      data: {
        user_id: user.id,
        working_type: data.working_type ?? "PROBATION",
        ...data,
      },

      include: { user: true, company: true },
    });

    return { ...createdEmployee, ...user };
  });

  await sendEmployeeDefaultPasswordEmail({
    to: data.email,
    name: data.name,
    password: defaultPassword,
  });

  return employee;
};

export const listEmployees = async (company_id: string, query: any) => {
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;
  const search = query.search || "";

  const status = query.status || undefined;
  const division_id = query.division_id || undefined;
  const working_type = query.working_type || undefined;

  const skip = (page - 1) * limit;

  // --- Base where ---
  const where: any = {
    company_id,
    AND: [],
  };

  // --- Search Filter ---
  if (search) {
    where.AND.push({
      OR: [
        { user: { name: { contains: search } } },
        { employee_code: { contains: search } },
        { phone: { contains: search } },
      ],
    });
  }

  // --- Status Filter ---
  if (status) {
    where.AND.push({ status });
  }

  // --- Division Filter ---
  if (division_id) {
    where.AND.push({ division_id });
  }

  // --- Working Type Filter ---
  if (working_type) {
    where.AND.push({ working_type });
  }

  const [data, total] = await Promise.all([
    prisma.employee.findMany({
      where,
      skip,
      take: limit,
      orderBy: { created_at: "desc" },
      include: {
        user: true,
        shift: true,
        division: true,
      },
    }),
    prisma.employee.count({ where }),
  ]);

  return {
    page,
    limit,
    total,
    data,
  };
};

export const getEmployeeDetail = async (id: string, company_id: string) => {
  const employee = await prisma.employee.findFirst({
    where: { id, company_id },
    include: {
      user: {
        select: {
          name: true,
          email: true,
          role: true,
          is_active: true,
        },
      },
      company: {
        select: { name: true },
      },
      shift: true,
      employeeLeaveBalances: {
        include: {
          category: true,
        },
      },
    },
  });

  if (!employee) {
    throw new Error("Employee tidak ditemukan");
  }

  return employee;
};

export const updateEmployee = async (
  id: string,
  company_id: string,
  data: any,
) => {
  const employee = await prisma.employee.findFirst({
    where: { id, company_id },
  });

  if (!employee) {
    throw new Error("Employee tidak ditemukan");
  }

  const updatedEmployee = await prisma.employee.update({
    where: { id },
    data,
    include: {
      user: true,
    },
  });

  return updatedEmployee;
};

export const deleteEmployee = async (id: string, company_id: string) => {
  const employee = await prisma.employee.findFirst({
    where: { id, company_id },
  });

  if (!employee) {
    throw new Error("Employee tidak ditemukan");
  }

  const result = await prisma.$transaction(async (tx) => {
    const emp = await tx.employee.update({
      where: { id },
      data: {
        status: "INACTIVE",
      },
    });

    // Nonaktifkan user login
    await tx.user.update({
      where: { id: employee.user_id },
      data: {
        is_active: false,
      },
    });

    return emp;
  });

  return result;
};
