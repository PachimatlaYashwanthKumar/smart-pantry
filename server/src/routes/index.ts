import { Router } from "express";

import authRoutes from "./auth.routes";
import productRoutes from "./product.routes";
import pantryRoutes from "./pantry.routes";
import shoppingRoutes from "./shopping.routes";
import healthRoutes from "./health.routes";
import purchaseRoutes from "./purchase.routes";
import dashboardRoutes from "./dashboard.routes";
import analyticsRoutes from "./analytics.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/products", productRoutes);
router.use("/analytics", analyticsRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/purchases", purchaseRoutes);
router.use("/pantry", pantryRoutes);
router.use("/shopping", shoppingRoutes);
router.use("/health", healthRoutes);

export default router;