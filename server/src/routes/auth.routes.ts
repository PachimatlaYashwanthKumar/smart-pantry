import { Router } from "express";

import authController from "../controllers/auth.controller";
import { authenticate } from "../middleware/auth.middleware";
import { validate } from "../middleware/validation.middleware";
import {
  registerSchema,
  loginSchema,
} from "../validations/auth.validation";

const router = Router();

router.post(
  "/register",
  validate(registerSchema),
  authController.register
);

router.post(
  "/login",
  validate(loginSchema),
  authController.login
);

router.get(
  "/me",
  authenticate,
  authController.me
);

export default router;