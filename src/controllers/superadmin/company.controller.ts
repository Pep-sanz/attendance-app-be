import { Response } from "express";
import {
  createCompany,
  listCompanies,
  getCompanyById,
  updateCompany,
  deactivateCompany,
} from "../../services/superadmin/company.service";
import { AuthRequest } from "../../middlewares/auth.middleware";

export const createCompanyController = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const company = await createCompany(req.body);
    res.status(201).json({ message: "Company created", data: company });
  } catch (e: any) {
    res.status(400).json({ message: e.message });
  }
};

export const listCompanyController = async (
  req: AuthRequest,
  res: Response
) => {
  const result = await listCompanies(req.query);
  res.json(result);
};

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

export const updateCompanyController = async (
  req: AuthRequest,
  res: Response
) => {
  const company = await updateCompany(req.params.id as string, req.body);
  res.json(company);
};

export const deactivateCompanyController = async (
  req: AuthRequest,
  res: Response
) => {
  const company = await deactivateCompany(req.params.id as string);
  res.json(company);
};
