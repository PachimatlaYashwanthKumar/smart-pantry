import { Response, NextFunction } from "express";

import pantryService from "../services/pantry.service";
import { AuthRequest } from "../middleware/auth.middleware";

class PantryController {
  async create(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const item = await pantryService.create(
        req.user!.id,
        req.body
      );

      res.status(201).json({
        success: true,
        data: item,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAll(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const items = await pantryService.getAll(req.user!.id);

      res.json({
        success: true,
        data: items,
      });
    } catch (error) {
      next(error);
    }
  }

  async getById(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id!;
      const item = await pantryService.getById(id);

      res.json({
        success: true,
        data: item,
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id!;

      const item = await pantryService.update(
        id,
        req.body
      );

      res.json({
        success: true,
        data: item,
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id!;

      await pantryService.delete(id);

      res.json({
        success: true,
        message: "Pantry item deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  async consume(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id!;

      const item = await pantryService.consume(
        id,
        req.body.quantity
      );

      res.json({
        success: true,
        data: item,
      });
    } catch (error) {
      next(error);
    }
  }

  async lowStock(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const items = await pantryService.lowStock(req.user!.id);

      res.json({
        success: true,
        data: items,
      });
    } catch (error) {
      next(error);
    }
  }

  async expiring(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const items = await pantryService.expiring(req.user!.id);

      res.json({
        success: true,
        data: items,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new PantryController();