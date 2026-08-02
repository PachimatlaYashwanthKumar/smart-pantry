import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError";

import userRepository from "../repositories/user.repository";
import { IUser } from "../models/user";

class AuthService {
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

    const jwtSecret = process.env.JWT_SECRET as jwt.Secret;
    const jwtOptions: jwt.SignOptions = {
      expiresIn: process.env.JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"],
    };

    const token = jwt.sign(
      {
        id: newUser._id,
        email: newUser.email,
      },
      jwtSecret,
      jwtOptions
    );

    const userResponse = {
  _id: newUser._id,
  firstName: newUser.firstName,
  lastName: newUser.lastName,
  email: newUser.email,
  role: newUser.role,
  isVerified: newUser.isVerified,
  createdAt: newUser.createdAt,
  updatedAt: newUser.updatedAt,
};

return {
  user: userResponse,
  token,
};
  }
}

export default new AuthService();