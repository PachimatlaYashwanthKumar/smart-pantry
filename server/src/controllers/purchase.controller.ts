import { Response, NextFunction } from "express";

import purchaseService from "../services/purchase.service";
import { AuthRequest } from "../middleware/auth.middleware";

class PurchaseController {
  async create(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const purchase = await purchaseService.create(
        req.user!.id,
        req.body
      );

      res.status(201).json({
        success: true,
        message: "Purchase created successfully",
        data: purchase,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAll(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const purchases = await purchaseService.getAll(
        req.user!.id
      );

      res.json({
        success: true,
        data: purchases,
      });
    } catch (error) {
      next(error);
    }
  }

  async getById(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const purchase = await purchaseService.getById(id);

      res.json({
        success: true,
        data: purchase,
      });
    } catch (error) {
      next(error);
    }
  }

  async update(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const purchase = await purchaseService.update(
        id,
        req.body
      );

      res.json({
        success: true,
        message: "Purchase updated successfully",
        data: purchase,
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      await purchaseService.delete(id);

      res.json({
        success: true,
        message: "Purchase deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new PurchaseController();