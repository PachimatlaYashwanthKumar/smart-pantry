import { Response, NextFunction } from "express";

import analyticsService from "../services/analytics.service";
import { AuthRequest } from "../middleware/auth.middleware";

class AnalyticsController {
  async monthlySpending(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const data =
        await analyticsService.getMonthlySpending(
          req.user!.id
        );

      res.json({
        success: true,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async summary(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const data =
        await analyticsService.getSummary(
          req.user!.id
        );

      res.json({
        success: true,
        data,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new AnalyticsController();