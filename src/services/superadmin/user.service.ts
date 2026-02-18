import prisma from "../../lib/prisma";
import bcrypt from "bcryptjs";

interface CreateUserDTO {
  email: string;
  password?: string; // Optional → akan dibuat default bila tidak ada
  name: string;
  role: "SUPERADMIN" | "ADMIN" | "EMPLOYEE";
  company_id?: string | null; // SUPERADMIN boleh null
}

export const createUser = async (data: CreateUserDTO) => {
  const { email, password, name, role, company_id } = data;

  // 1️⃣ Cek apakah email sudah terdaftar
  const existing = await prisma.user.findUnique({
    where: { email },
  });

  if (existing) {
    throw new Error("Email sudah digunakan.");
  }

  // 2️⃣ Generate default password bila tidak diberikan admin
  const finalPassword = password ?? "default123";

  // 3️⃣ Hash password
  const hashedPassword = await bcrypt.hash(finalPassword, 10);

  // 4️⃣ Validasi role SUPERADMIN → tidak boleh punya company_id
  let finalCompanyId = company_id || null;
  if (role === "SUPERADMIN") {
    finalCompanyId = null;
  }

  // 5️⃣ Buat user
  const newUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      role,
      company_id: finalCompanyId,
    },
  });

  return {
    user: newUser,
    defaultPassword: password ? undefined : finalPassword,
  };
};
