import { useNavigate } from "react-router-dom";
import {
  FiBell,
  FiLogOut,
  FiSearch,
  FiUser,
} from "react-icons/fi";

import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6 shadow-sm">
      {/* Logo */}
      <div
        className="cursor-pointer"
        onClick={() => navigate("/dashboard")}
      >
        <h1 className="text-2xl font-bold text-green-600">
          🥫 Smart Pantry
        </h1>

        <p className="text-xs text-gray-500">
          Inventory Management
        </p>
      </div>

      {/* Search */}
      <div className="hidden w-96 items-center rounded-lg border border-gray-300 bg-gray-50 px-3 md:flex">
        <FiSearch className="mr-2 text-gray-400" />

        <input
          type="text"
          placeholder="Search products..., pantry..."
          className="w-full bg-transparent py-2 outline-none"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">
        {/* Notification */}
        <button className="relative rounded-full p-2 transition hover:bg-gray-100">
          <FiBell className="text-xl text-gray-600" />

          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500"></span>
        </button>

        {/* User */}
        <div className="hidden items-center gap-3 lg:flex">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
            <FiUser className="text-green-600" />
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-800">
              Welcome
            </p>

            <p className="text-xs text-gray-500">
              {user?.email}
            </p>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="rounded-lg p-2 transition hover:bg-red-50"
          title="Logout"
        >
          <FiLogOut className="text-xl text-red-500" />
        </button>
      </div>
    </header>
  );
}