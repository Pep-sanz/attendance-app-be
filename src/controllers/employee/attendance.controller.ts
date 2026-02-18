import { Request, Response } from "express";
import * as AttendanceService from "../../services/employee/attendance.service";
import { AuthRequest } from "../../middlewares/auth.middleware";

export const checkIn = async (req: AuthRequest, res: Response) => {
  try {
    const { lat, lng } = req.body;
    const user = req.user!;

    const result = await AttendanceService.checkIn(user.id, lat, lng);

    return res.json({
      message: "Check-in successful",
      data: result,
    });
  } catch (err: any) {
    return res.status(400).json({ message: err.message });
  }
};

export const checkOut = async (req: AuthRequest, res: Response) => {
  try {
    const { lat, lng } = req.body;
    const user = req.user!;

    const result = await AttendanceService.checkOut(user.id, lat, lng);

    return res.json({
      message: "Check-out successful",
      data: result,
    });
  } catch (err: any) {
    return res.status(400).json({ message: err.message });
  }
};

export const attendanceHistory = async (req: AuthRequest, res: Response) => {
  try {
    const user = req.user!;
    const { start_date, end_date } = req.query;

    const history = await AttendanceService.getEmployeeAttendanceHistory({
      user_id: user.id,
      start_date: start_date ? new Date(start_date as string) : undefined,
      end_date: end_date ? new Date(end_date as string) : undefined,
    });

    return res.json({
      message: "Attendance history fetched",
      data: history,
    });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};
