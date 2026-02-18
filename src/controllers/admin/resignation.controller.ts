import { Request, Response } from "express";
import {
  listResignationRequests,
  approveResignation,
  rejectResignation,
} from "../../services/admin/resignation.service";
import { AuthRequest } from "../../middlewares/auth.middleware";

export const getAdminResignationRequests = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const admin = req.user!;
    const company_id = admin.company_id;

    const data = await listResignationRequests(company_id!, req.query);

    return res.json({
      message: "Resignation requests fetched",
      ...data,
    });
  } catch (err: any) {
    return res.status(400).json({ message: err.message });
  }
};

export const adminApproveResignation = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const admin = req.user!;
    const { id } = req.params;

    const result = await approveResignation(id as string, admin.id);

    return res.json({
      message: "Resignation approved successfully",
      data: result,
    });
  } catch (err: any) {
    return res.status(400).json({ message: err.message });
  }
};

export const adminRejectResignation = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const admin = req.user!;
    const { id } = req.params;

    const result = await rejectResignation(id as string, admin.id);

    return res.json({
      message: "Resignation rejected",
      data: result,
    });
  } catch (err: any) {
    return res.status(400).json({ message: err.message });
  }
};
