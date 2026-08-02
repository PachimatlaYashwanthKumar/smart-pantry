/* eslint-disable react-refresh/only-export-components */

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import authService from "../services/auth.service";

interface User {
  id?: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;

  login: (token: string) => Promise<void>;

  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);

  const [loading, setLoading] = useState(true);

  async function loadUser() {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      const response = await authService.getCurrentUser();

      setUser(response.data);
    } catch (error) {
      console.error(error);

      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    (async () => {
      await loadUser();
    })();
  }, []);

  async function login(token: string) {
    localStorage.setItem("token", token);

    await loadUser();
  }

  function logout() {
    localStorage.removeItem("token");

    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}