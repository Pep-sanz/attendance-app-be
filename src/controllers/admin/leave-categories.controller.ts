import { Request, Response } from "express";
import {
  createLeaveCategory,
  getLeaveCategories,
  updateLeaveCategory,
  deleteLeaveCategory,
} from "../../services/admin/leave-categories.service";
import { AuthRequest } from "../../middlewares/auth.middleware";

export const createCategory = async (req: AuthRequest, res: Response) => {
  const admin = req.user!;
  try {
    const category = await createLeaveCategory(admin.company_id!, req.body);
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ message: "Failed to create leave category", err });
  }
};

export const listCategories = async (req: AuthRequest, res: Response) => {
  const admin = req.user!;
  try {
    const categories = await getLeaveCategories(admin.company_id!);
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch categories" });
  }
};

export const updateCategoryController = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const category = await updateLeaveCategory(
      req?.params?.id as string,
      req.body
    );
    res.json(category);
  } catch (err) {
    res.status(500).json({ message: "Failed to update category" });
  }
};

export const deleteCategoryController = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    await deleteLeaveCategory(req.params.id as string);
    res.json({ message: "Category deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete category" });
  }
};
