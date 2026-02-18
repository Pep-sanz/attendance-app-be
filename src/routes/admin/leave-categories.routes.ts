import { Router } from "express";
import * as leaveCategories from "../../controllers/admin/leave-categories.controller";

import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

router.use(authMiddleware);

router.post("/", leaveCategories.createCategory);
router.get("/", leaveCategories.listCategories);
router.put("/:id", leaveCategories.updateCategoryController);
router.delete("/:id", leaveCategories.deleteCategoryController);

export default router;
