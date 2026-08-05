import { Router } from "express";

import { authenticate } from "../middleware/auth.middleware";
import pantryController from "../controllers/pantry.controller";

const router = Router();

router.use(authenticate);

router.post("/", pantryController.create);

router.get("/", pantryController.getAll);

router.get("/low-stock", pantryController.lowStock);

router.get("/expiring", pantryController.expiring);

router.get("/:id", pantryController.getById);

router.put("/:id", pantryController.update);

router.patch("/:id/consume", pantryController.consume);

router.delete("/:id", pantryController.delete);

export default router;