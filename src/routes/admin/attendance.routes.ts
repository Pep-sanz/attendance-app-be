import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import * as AttendanceController from "../../controllers/admin/attendance.controller";

const router = Router();

router.use(authMiddleware);

router.get("/", AttendanceController.list);
router.get("/:id", AttendanceController.detail);
router.put("/:id", AttendanceController.update);
router.delete("/:id", AttendanceController.remove);

export default router;
