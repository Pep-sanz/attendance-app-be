import { Response } from "express";
import { AuthRequest } from "../../middlewares/auth.middleware";
import { createUser } from "../../services/superadmin/user.service";

export const createUserController = async (req: AuthRequest, res: Response) => {
  try {
    const result = await createUser(req.body);

    res.status(201).json({
      message: "User berhasil dibuat",
      data: result.user,
      defaultPassword: result.defaultPassword, // kirim ke email service
    });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
