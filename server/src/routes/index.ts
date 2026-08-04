import { Router } from "express";

import authRoutes from "./auth.routes";
import productRoutes from "./product.routes";
import pantryRoutes from "./pantry.routes";
import shoppingRoutes from "./shopping.routes";
import healthRoutes from "./health.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/products", productRoutes);
router.use("/pantry", pantryRoutes);
router.use("/shopping", shoppingRoutes);
router.use("/health", healthRoutes);

export default router;