import { Router } from "express";

import purchaseController from "../controllers/purchase.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.use(authenticate);

router.post("/", purchaseController.create);

router.get("/", purchaseController.getAll);

router.get("/:id", purchaseController.getById);

router.put("/:id", purchaseController.update);

router.delete("/:id", purchaseController.delete);

export default router;