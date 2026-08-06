import { Router } from "express";

import { authenticate } from "../middleware/auth.middleware";
import analyticsController from "../controllers/analytics.controller";

const router = Router();

router.use(authenticate);

router.get(
  "/monthly-spending",
  analyticsController.monthlySpending
);

router.get(
  "/summary",
  analyticsController.summary
);

export default router;