import prisma from "../../lib/prisma";

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
 * Get company by admin (ADMIN)
 */
export const getMyCompany = async (company_id: string) => {
  return prisma.company.findUnique({
    where: { id: company_id },
  });
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
