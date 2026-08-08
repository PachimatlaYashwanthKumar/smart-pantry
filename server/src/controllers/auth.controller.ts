import { Request, Response, NextFunction } from "express";
import authService from "../services/auth.services";
import { AuthRequest } from "../middleware/auth.middleware";


class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await authService.register(req.body);

      return res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
  
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

    const result = await authService.login(email, password);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    next(error);
  }
} 
  async me(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    return res.status(200).json({
      success: true,
      message: "Authenticated user",
      data: req.user,
    });
  } catch (error) {
    next(error);
  }
}
}

export default new AuthController();