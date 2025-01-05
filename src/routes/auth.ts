import { Router } from "express";
import {
  signUp,
  login,
  logout,
  fa_Setup,
  fa_reset,
  fa_verfiy,
} from "../controllers/auth.controller";

const router: Router = Router();

router.get("/sign-up", signUp);
router.post("/login", login);
router.post("/logout", logout);
router.post("/2fa/setup", fa_Setup);
router.post("/2fa/verify", fa_verfiy);
router.post("/2fa/reset", fa_reset);

export default router;
