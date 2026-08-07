import { Response, NextFunction } from "express";

import shoppingService from "../services/shopping.service";
import { AuthRequest } from "../middleware/auth.middleware";

class ShoppingController {
  async create(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const item =
        await shoppingService.create(
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

  async getAll(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const items =
        await shoppingService.getAll(
          req.user!.id
        );

      res.json({
        success: true,
        data: items,
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
      const id =
        Array.isArray(req.params.id)
          ? req.params.id[0]
          : req.params.id;

      const item =
        await shoppingService.getById(id);

      res.json({
        success: true,
        data: item,
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
      const id =
        Array.isArray(req.params.id)
          ? req.params.id[0]
          : req.params.id;

      const item =
        await shoppingService.update(
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

  async delete(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id =
        Array.isArray(req.params.id)
          ? req.params.id[0]
          : req.params.id;

      await shoppingService.delete(id);

      res.json({
        success: true,
        message:
          "Shopping item deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  async toggle(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id =
        Array.isArray(req.params.id)
          ? req.params.id[0]
          : req.params.id;

      const item =
        await shoppingService.toggle(id);

      res.json({
        success: true,
        data: item,
      });
    } catch (error) {
      next(error);
    }
  }
    async generate(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result =
        await shoppingService.generate(
          req.user!.id
        );

      res.json({
        success: true,
        ...result,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new ShoppingController();