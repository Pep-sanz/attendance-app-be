import { Response } from "express";
import {
  getCompanyById,
  updateCompany,
  getMyCompany,
} from "../../services/admin/company.service";
import { AuthRequest } from "../../middlewares/auth.middleware";

export const getCompanyDetailController = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const company = await getCompanyById(req.params.id as string);
    res.json(company);
  } catch (e: any) {
    res.status(404).json({ message: e.message });
  }
};

export const getMyCompanyController = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const admin = req.user;

    if (!admin || admin.role !== "ADMIN") {
      return res.status(403).json({
        message: "Anda tidak memiliki akses",
      });
    }
    const company = await getMyCompany(admin?.company_id!);
    res.json(company);
  } catch (e: any) {
    res.status(404).json({ message: e.message });
  }
};

export const updateCompanyController = async (
  req: AuthRequest,
  res: Response
) => {
  const company = await updateCompany(req.params.id as string, req.body);
  res.json(company);
};
