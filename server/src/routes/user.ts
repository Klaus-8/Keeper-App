import { Router } from "express";

import { userLogin, userRegister } from "../controllers/user.js";

const router = Router();

router.post("/login", userLogin);
router.post("/register", userRegister);

export default router;
