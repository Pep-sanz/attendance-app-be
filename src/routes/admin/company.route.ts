import { Router } from "express";
import * as companyService from "../../controllers/admin/company.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

router.get("/:id", authMiddleware, companyService.getCompanyDetailController);
router.get("/me", authMiddleware, companyService.getMyCompanyController);
router.put("/:id", authMiddleware, companyService.updateCompanyController);

export default router;
