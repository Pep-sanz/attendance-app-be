import { Request, Response } from "express";
import {
  createEmployeeResignation,
  getMyResignation,
} from "../../services/employee/resignation.service";
import { AuthRequest } from "../../middlewares/auth.middleware";

export const submitResignation = async (req: AuthRequest, res: Response) => {
  try {
    const employee = req.user!;
    const { last_working_date, reason } = req.body;

    const result = await createEmployeeResignation(employee.id, {
      last_working_date,
      reason,
    });

    return res.json({
      message: "Resignation request submitted successfully",
      data: result,
    });
  } catch (err: any) {
    return res.status(400).json({ message: err.message });
  }
};

export const getMyResignationRequest = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const employee = req.user!;

    const data = await getMyResignation(employee.id);

    return res.json({
      message: "Your resignation request",
      data,
    });
  } catch (err: any) {
    return res.status(400).json({ message: err.message });
  }
};
