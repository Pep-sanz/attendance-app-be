import { Request, Response } from "express";
import {
  approveLeaveRequest,
  listLeaveRequests,
  rejectLeaveRequest,
} from "../../services/admin/leave.service";
import { AuthRequest } from "../../middlewares/auth.middleware";

export const getAdminLeaveRequests = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const admin = req.user!;
    const company_id = admin.company_id;

    if (!company_id) {
      return res.status(400).json({
        message: "Admin does not belong to any company",
      });
    }

    const data = await listLeaveRequests(company_id, req.query);

    return res.json({
      message: "Leave requests fetched successfully",
      ...data,
    });
  } catch (err: any) {
    return res.status(400).json({ message: err.message });
  }
};

export const approveLeave = async (req: AuthRequest, res: Response) => {
  try {
    const admin = req.user!;
    const { id } = req.params;

    const result = await approveLeaveRequest(id as string, admin.id);

    return res.json({
      message: "Leave request approved",
      data: result,
    });
  } catch (err: any) {
    return res.status(400).json({ message: err.message });
  }
};

export const rejectLeave = async (req: AuthRequest, res: Response) => {
  try {
    const admin = req.user!;
    const { id } = req.params;
    const { reason } = req.body;

    const result = await rejectLeaveRequest(id as string, admin.id, reason);

    return res.json({
      message: "Leave request rejected",
      data: result,
    });
  } catch (err: any) {
    return res.status(400).json({ message: err.message });
  }
};
