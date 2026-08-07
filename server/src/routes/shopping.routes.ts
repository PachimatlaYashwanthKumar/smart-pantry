import { Router } from "express";

import { authenticate } from "../middleware/auth.middleware";
import shoppingController from "../controllers/shopping.controller";

const router = Router();

router.use(authenticate);

router.post("/", shoppingController.create);

router.post(
  "/generate",
  shoppingController.generate
);

router.get("/", shoppingController.getAll);

router.get("/:id", shoppingController.getById);

router.put("/:id", shoppingController.update);

router.patch(
  "/:id/toggle",
  shoppingController.toggle
);

router.delete(
  "/:id",
  shoppingController.delete
);

export default router;