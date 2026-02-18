import { Router } from "express";
import * as companyService from "../../controllers/superadmin/company.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

router.post("/", authMiddleware, companyService.createCompanyController);
router.get("/", authMiddleware, companyService.listCompanyController);
router.get("/:id", authMiddleware, companyService.getCompanyDetailController);

router.put("/:id", authMiddleware, companyService.updateCompanyController);
router.delete(
  "/:id",
  authMiddleware,
  companyService.deactivateCompanyController
);

export default router;
