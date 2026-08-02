import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

import ApiError from "../utils/ApiError";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}

export function authenticate(
  req: AuthRequest,
  _res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(new ApiError(401, "Authorization token is missing"));
  }

  const token = authHeader.startsWith("Bearer ")
    ? authHeader.substring(7)
    : authHeader;

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as {
      id: string;
      email: string;
    };

    req.user = decoded;

    next();
  } catch {
    next(new ApiError(401, "Invalid or expired token"));
  }
}