import { Router } from "express";
import * as divisionController from "../../controllers/admin/division.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { adminOnly } from "../../middlewares/role.middleware";
const router = Router();

router.post(
  "/",
  authMiddleware,
  adminOnly,
  divisionController.DivisionController.create,
);
router.get(
  "/",
  authMiddleware,
  adminOnly,
  divisionController.DivisionController.list,
);
router.get(
  "/:id",
  authMiddleware,
  adminOnly,
  divisionController.DivisionController.detail,
);
router.put(
  "/:id",
  authMiddleware,
  adminOnly,
  divisionController.DivisionController.update,
);
router.delete(
  "/:id",
  authMiddleware,
  adminOnly,
  divisionController.DivisionController.remove,
);

export default router;
