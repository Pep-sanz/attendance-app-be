import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import * as leaveController from "../../controllers/employee/leave.controller";

const router = Router();

router.use(authMiddleware);

router.get("/categories/", leaveController.listCategories);
router.post("/request/", leaveController.requestLeave);
router.get("/request/me", leaveController.myLeaveRequests);

export default router;
