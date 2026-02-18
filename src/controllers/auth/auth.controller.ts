import { Request, Response } from "express";
import { loginService } from "../../services/auth/auth.service";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const result = await loginService(email, password);

    return res.json(result);
  } catch (error: any) {
    return res.status(401).json({
      message: error.message,
    });
  }
};
