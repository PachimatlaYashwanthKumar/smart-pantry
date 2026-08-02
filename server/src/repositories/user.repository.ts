import User, { IUser } from "../models/user";

export class UserRepository {
  async findByEmail(email: string): Promise<IUser | null> {
    return User.findOne({ email });
  }

  async create(userData: Partial<IUser>): Promise<IUser> {
    return User.create(userData);
  }

  async findById(id: string): Promise<IUser | null> {
    return User.findById(id);
  }
}

export default new UserRepository();