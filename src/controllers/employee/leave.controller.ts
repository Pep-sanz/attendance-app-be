import { Request, Response } from "express";
import * as LeaveService from "../../services/employee/leave.service";
import { AuthRequest } from "../../middlewares/auth.middleware";

export const listCategories = async (req: AuthRequest, res: Response) => {
  const admin = req.user!;
  try {
    const categories = await LeaveService.getLeaveCategories(admin.company_id!);
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch categories" });
  }
};

export const requestLeave = async (req: AuthRequest, res: Response) => {
  try {
    const user = req.user!;

    const leave = await LeaveService.createLeaveRequest(user.id, req.body);

    return res.status(201).json({
      message: "Leave request submitted",
      data: leave,
    });
  } catch (err: any) {
    return res.status(400).json({
      message: err.message,
    });
  }
};

export const myLeaveRequests = async (req: AuthRequest, res: Response) => {
  try {
    const user = req.user!;
    const data = await LeaveService.getMyLeaveRequests(user.id);

    return res.json({ data });
  } catch (err) {
    return res.status(500).json({ message: "Failed to fetch leave requests" });
  }
};
