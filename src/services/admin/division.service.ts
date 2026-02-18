import prisma from "../../lib/prisma";

export const createDivision = async (company_id: string, name: string) => {
  const normalizedName = name.trim().toLowerCase();

  const exists = await prisma.division.findFirst({
    where: {
      company_id,
      name: normalizedName,
    },
  });

  if (exists) {
    throw new Error("Division with this name already exists");
  }

  return prisma.division.create({
    data: {
      company_id,
      name,
    },
  });
};

export const updateDivision = async (
  division_id: string,
  data: { name: string; description: string },
) => {
  const division = await prisma.division.findUnique({
    where: { id: division_id },
  });

  if (!division) {
    throw new Error("Division not found");
  }

  return prisma.division.update({
    where: { id: division_id },
    data,
  });
};

export const deleteDivision = async (division_id: string) => {
  const division = await prisma.division.findUnique({
    where: { id: division_id },
  });

  if (!division) {
    throw new Error("Division not found");
  }

  // optional: pastikan tidak ada employee memakai divisi ini
  const linkedEmployees = await prisma.employee.count({
    where: { division_id },
  });

  if (linkedEmployees > 0) {
    throw new Error(
      "Division cannot be deleted because it is used by employees",
    );
  }

  return prisma.division.delete({
    where: { id: division_id },
  });
};

export const listDivisions = async (company_id: string, query: any) => {
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;
  const search = query.search || "";

  const skip = (page - 1) * limit;

  const where = {
    company_id,
    ...(search && {
      name: {
        contains: search,
      },
    }),
  };

  const [data, total] = await Promise.all([
    prisma.division.findMany({
      where,
      skip,
      take: limit,
      orderBy: { created_at: "desc" },
    }),
    prisma.division.count({ where }),
  ]);

  return {
    page,
    limit,
    total,
    data,
  };
};

export const getDivisionDetail = async (division_id: string) => {
  const division = await prisma.division.findUnique({
    where: { id: division_id },
    include: {
      employees: true,
    },
  });

  if (!division) {
    throw new Error("Division not found");
  }

  return division;
};
