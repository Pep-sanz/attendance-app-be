import { Router } from "express";
import * as leaveController from "../../controllers/admin/leave.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { adminOnly } from "../../middlewares/role.middleware";

const router = Router();

router.get(
  "/",
  authMiddleware,
  adminOnly,
  leaveController.getAdminLeaveRequests,
);

router.patch(
  "/:id/approve",
  authMiddleware,
  adminOnly,
  leaveController.approveLeave,
);
router.patch(
  "/:id/reject",
  authMiddleware,
  adminOnly,
  leaveController.rejectLeave,
);

export default router;
