import { Router } from "express";
import {
  signUp,
  login,
  logout,
  fa_Setup,
  fa_reset,
  fa_verfiy,
} from "../controllers/auth.controller";
import passport from "passport";
import { protectedMiddleware } from "../middleware/protected";

const router: Router = Router();

router.post("/sign-up", signUp);
router.post("/login", passport.authenticate("local"), login);
router.post("/logout", logout);
router.post("/2fa/setup", protectedMiddleware, fa_Setup);
router.post("/2fa/verify", protectedMiddleware, fa_verfiy);
router.post("/2fa/reset", protectedMiddleware, fa_reset);

export default router;
