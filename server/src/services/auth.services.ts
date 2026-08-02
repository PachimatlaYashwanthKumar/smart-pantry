import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

import ApiError from "../utils/ApiError";
import userRepository from "../repositories/user.repository";
import { IUser } from "../models/user";

class AuthService {
  // Generate JWT Token
  private generateToken(user: IUser): string {
    const jwtSecret = process.env.JWT_SECRET as string;

    const jwtExpiresIn =
      (process.env.JWT_EXPIRES_IN ?? "1h") as jwt.SignOptions["expiresIn"];

    return jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      jwtSecret,
      {
        expiresIn: jwtExpiresIn,
      }
    );
  }

  // Remove sensitive fields before sending user to frontend
  private buildUserResponse(user: IUser) {
    return {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  // Register User
  async register(userData: Partial<IUser>) {
    const existingUser = await userRepository.findByEmail(userData.email!);

    if (existingUser) {
      throw new ApiError(409, "User already exists");
    }

    const hashedPassword = await bcrypt.hash(userData.password!, 10);

    const newUser = await userRepository.create({
      ...userData,
      password: hashedPassword,
    });

    const token = this.generateToken(newUser);

    return {
      user: this.buildUserResponse(newUser),
      token,
    };
  }

  // Login User
  async login(email: string, password: string) {
    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new ApiError(401, "Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid email or password");
    }

    const token = this.generateToken(user);

    return {
      user: this.buildUserResponse(user),
      token,
    };
  }
}

export default new AuthService();