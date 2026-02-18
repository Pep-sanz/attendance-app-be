import { Request, Response } from "express";
import * as AttendanceService from "../../services/admin/attendance.service";
import { AuthRequest } from "../../middlewares/auth.middleware";

export const list = async (req: AuthRequest, res: Response) => {
  try {
    const admin = req.user;
    const data = await AttendanceService.listAttendance(
      admin!.company_id!,
      req.query,
    );

    return res.json({ data });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const detail = async (req: AuthRequest, res: Response) => {
  try {
    const admin = req.user;
    const { id } = req.params;

    const attendance = await AttendanceService.attendanceDetail(
      admin!.company_id!,
      id as string,
    );

    if (!attendance) {
      return res.status(404).json({ message: "Attendance not found" });
    }

    return res.json({ data: attendance });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const update = async (req: AuthRequest, res: Response) => {
  try {
    const admin = req.user;
    const { id } = req.params;

    await AttendanceService.updateAttendance(
      admin!.company_id!,
      id as string,
      req.body,
    );

    return res.json({ message: "Attendance updated successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const remove = async (req: AuthRequest, res: Response) => {
  try {
    const admin = req.user;
    const { id } = req.params;

    await AttendanceService.deleteAttendance(admin!.company_id!, id as string);

    return res.json({ message: "Attendance deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
