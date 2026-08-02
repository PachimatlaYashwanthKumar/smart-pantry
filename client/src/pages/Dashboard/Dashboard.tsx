import { useEffect, useState } from "react";
import authService from "../../services/auth.service";

interface User {
  id?: string;
  email: string;
  iat?: number;
  exp?: number;
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await authService.getCurrentUser();
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="mb-6 text-3xl font-bold text-green-600">
        Dashboard
      </h1>

      {user ? (
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="text-xl font-semibold">
            Welcome back!
          </h2>

          <p className="mt-3">
            <strong>Email:</strong> {user.email}
          </p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}