import { Response } from "express";
import * as ShiftService from "../../services/admin/shift.service";
import { AuthRequest } from "../../middlewares/auth.middleware";

/**
 * CREATE SHIFT
 */
export const createShift = async (req: AuthRequest, res: Response) => {
  try {
    const admin = req.user;
    if (!admin?.company_id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const shift = await ShiftService.createShift(admin.company_id, req.body);

    return res.status(201).json({
      message: "Shift created successfully",
      data: shift,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * LIST SHIFTS
 */
export const listShifts = async (req: AuthRequest, res: Response) => {
  try {
    const admin = req.user;
    if (!admin?.company_id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const shifts = await ShiftService.listShifts(admin.company_id);

    return res.json({
      data: shifts,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * UPDATE SHIFT
 */
export const updateShift = async (req: AuthRequest, res: Response) => {
  try {
    const admin = req.user;
    const { id } = req.params;

    if (!admin?.company_id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await ShiftService.updateShift(id as string, admin.company_id, req.body);

    return res.json({
      message: "Shift updated successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * DELETE (SOFT DELETE) SHIFT
 */
export const deleteShift = async (req: AuthRequest, res: Response) => {
  try {
    const admin = req.user;
    const { id } = req.params;

    if (!admin?.company_id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await ShiftService.deleteShift(id as string, admin.company_id);

    return res.json({
      message: "Shift deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * ASSIGN SHIFT TO EMPLOYEE
 */
export const assignShiftToEmployee = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const admin = req.user;
    const { employee_id, shift_id } = req.body;

    if (!admin?.company_id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await ShiftService.assignShiftToEmployee(
      employee_id,
      shift_id,
      admin.company_id
    );

    return res.json({
      message: "Shift assigned to employee",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
