import { Router } from "express";
import { createUserController } from "../../controllers/superadmin/user.controller";

const router = Router();

router.post("/", createUserController);

export default router;
