import { Router } from "express";
import {
  getAdminResignationRequests,
  adminApproveResignation,
  adminRejectResignation,
} from "../../controllers/admin/resignation.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { adminOnly } from "../../middlewares/role.middleware";

const router = Router();

router.get("/", authMiddleware, adminOnly, getAdminResignationRequests);
router.post("/:id/approve", authMiddleware, adminOnly, adminApproveResignation);
router.post("/:id/reject", authMiddleware, adminOnly, adminRejectResignation);

export default router;
