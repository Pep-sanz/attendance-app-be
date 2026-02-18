import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import * as ShiftController from "../../controllers/admin/shift.controller";

const router = Router();

router.use(authMiddleware);

router.post("/", ShiftController.createShift);
router.get("/", ShiftController.listShifts);
router.put("/:id", ShiftController.updateShift);
router.delete("/:id", ShiftController.deleteShift);

router.post("/assign", ShiftController.assignShiftToEmployee);

export default router;
