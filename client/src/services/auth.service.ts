import api from "./api";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

class AuthService {
  async login(data: LoginRequest) {
    const response = await api.post("/auth/login", data);
    return response.data;
  }

  async register(data: RegisterRequest) {
    const response = await api.post("/auth/register", data);
    return response.data;
  }

  async getCurrentUser() {
    const response = await api.get("/auth/me");
    return response.data;
  }

  logout() {
    localStorage.removeItem("token");
  }
}

export default new AuthService();