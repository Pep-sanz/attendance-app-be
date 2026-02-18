import prisma from "../../lib/prisma";

/**
 * Create company (SUPERADMIN)
 */
export const createCompany = async (data: {
  name: string;
  phone: string;
  address?: string;
  latitude: number;
  longitude: number;
}) => {
  console.log(data, "test ini data company");
  return prisma.company.create({
    data,
  });
};

/**
 * List companies (SUPERADMIN)
 */
export const listCompanies = async (query: any) => {
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;
  const search = query.search || "";

  const skip = (page - 1) * limit;

  const where = {
    name: {
      contains: search,
    },
  };

  const [data, total] = await Promise.all([
    prisma.company.findMany({
      where,
      skip,
      take: limit,
      orderBy: { created_at: "desc" },
    }),
    prisma.company.count({ where }),
  ]);

  return { page, limit, total, data };
};

/**
 * Get company detail by ID
 */
export const getCompanyById = async (id: string) => {
  const company = await prisma.company.findUnique({
    where: { id },
    include: {
      employees: true,
      users: true,
    },
  });

  if (!company) {
    throw new Error("Company tidak ditemukan");
  }

  return company;
};

/**
 * Update company
 */
export const updateCompany = async (
  id: string,
  data: {
    name?: string;
    phone?: string;
    address?: string;
    isActive?: boolean;
  }
) => {
  return prisma.company.update({
    where: { id },
    data,
  });
};

/**
 * Deactivate company (soft delete)
 */
export const deactivateCompany = async (id: string) => {
  return prisma.company.update({
    where: { id },
    data: {
      is_active: false,
    },
  });
};
