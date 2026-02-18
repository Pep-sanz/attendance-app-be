import { Response } from "express";
import {
  createDivision,
  updateDivision,
  deleteDivision,
  listDivisions,
  getDivisionDetail,
} from "../../services/admin/division.service";
import { AuthRequest } from "../../middlewares/auth.middleware";

export class DivisionController {
  static async create(req: AuthRequest, res: Response) {
    try {
      const admin = req.user;
      if (!admin?.company_id) {
        return res.status(400).json({ message: "Company ID is required" });
      }

      const { name } = req.body;

      const division = await createDivision(admin.company_id, name);

      res.status(201).json({
        message: "Division created successfully",
        data: division,
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async update(req: AuthRequest, res: Response) {
    try {
      const divisionId = req.params.id;
      const { name, description } = req.body;

      const updated = await updateDivision(divisionId as string, {
        name,
        description,
      });

      res.status(200).json({
        message: "Division updated successfully",
        data: updated,
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async remove(req: AuthRequest, res: Response) {
    try {
      const divisionId = req.params.id;

      const deleted = await deleteDivision(divisionId as string);

      res.status(200).json({
        message: "Division deleted successfully",
        data: deleted,
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async list(req: AuthRequest, res: Response) {
    try {
      const admin = req.user;
      console.log(admin, "admin");
      if (!admin?.company_id) {
        return res.status(400).json({ message: "Company ID is required" });
      }

      const divisions = await listDivisions(admin.company_id, req.query);

      res.status(200).json({
        message: "Division list retrieved",
        data: {
          pagination: {
            page: divisions.page,
            limit: divisions.limit,
            total_data: divisions.total,
          },
          result: divisions.data,
        },
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async detail(req: AuthRequest, res: Response) {
    try {
      const divisionId = req.params.id;

      const division = await getDivisionDetail(divisionId as string);

      res.status(200).json({
        message: "Division detail retrieved",
        data: division,
      });
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }
}
