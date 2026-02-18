import { Router } from "express";
import * as resignationController from "../../controllers/employee/resignation.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { employeeOnly } from "../../middlewares/role.middleware";

const router = Router();

router.post(
  "/",
  authMiddleware,
  employeeOnly,
  resignationController.submitResignation,
);
router.get(
  "/",
  authMiddleware,
  employeeOnly,
  resignationController.getMyResignationRequest,
);

export default router;
