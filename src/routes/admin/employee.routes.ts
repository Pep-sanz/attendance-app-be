import { Router } from "express";
import {
  deleteEmployeeController,
  GetEmployeeController,
  getEmployeeDetailController,
  postEmployeeController,
  updateEmployeeController,
} from "../../controllers/admin/data-employee.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

router.post("/", authMiddleware, postEmployeeController);
router.get("/", authMiddleware, GetEmployeeController);
router.get("/:id", authMiddleware, getEmployeeDetailController);
router.put("/:id", authMiddleware, updateEmployeeController);
router.delete("/:id", authMiddleware, deleteEmployeeController);

export default router;
