import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";
import Input from "../../components/Input/Input";
import authService from "../../services/auth.service";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await authService.login({
        email,
        password,
      });

      await login(response.data.token);

      navigate("/dashboard");
    } 
    catch (error: unknown) {
      const getErrorMessage = (err: unknown) => {
        if (
          typeof err === "object" &&
          err !== null &&
          "response" in err &&
          typeof (err as { response?: { data?: { message?: string } } }).response?.data?.message === "string"
        ) {
          return (err as { response: { data: { message: string } } }).response.data.message;
        }

        if (error instanceof Error) {
          return error.message;
        }

        return "Something went wrong.";
      };

      setError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <Card>
        <h1 className="mb-2 text-center text-3xl font-bold text-green-600">
          Smart Pantry
        </h1>

        <p className="mb-8 text-center text-gray-500">
          Welcome back! Please sign in.
        </p>

        {error && (
          <div className="mb-4 rounded-lg bg-red-100 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="mt-6">
            <Button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-green-600 hover:underline"
          >
            Register
          </Link>
        </p>
      </Card>
    </div>
  );
}