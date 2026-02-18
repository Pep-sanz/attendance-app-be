import prisma from "../../lib/prisma";
import { comparePassword } from "../../utils/password";
import { signToken } from "../../utils/jwt";

export const loginService = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isValid = await comparePassword(password, user.password);
  if (!isValid) {
    throw new Error("Invalid email or password");
  }

  const token = signToken({
    sub: user.id,
    role: user.role,
    company_id: user.company_id,
  });

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      company_id: user.company_id,
    },
  };
};
