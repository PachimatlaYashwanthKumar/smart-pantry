import { Response, NextFunction } from "express";

import dashboardService from "../services/dashboard.service";
import { AuthRequest } from "../middleware/auth.middleware";

class DashboardController {
  async summary(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const summary =
        await dashboardService.getSummary(
          req.user!.id
        );

      res.json({
        success: true,
        data: summary,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new DashboardController();