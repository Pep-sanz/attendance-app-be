import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import * as AttendanceController from "../../controllers/employee/attendance.controller";

const router = Router();

router.use(authMiddleware);

router.post("/check-in", AttendanceController.checkIn);
router.post("/check-out", AttendanceController.checkOut);
router.get("/history", AttendanceController.attendanceHistory);

export default router;
