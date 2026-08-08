import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useAuth } from "../../context/AuthContext";

export default function Settings() {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const [darkMode, setDarkMode] =
    useState(false);

  const [profile, setProfile] =
    useState({
      email: user?.email ?? "",
      name: "",
    });

  function handleLogout() {
    logout();

    toast.success("Logged out successfully");

    navigate("/login");
  }

  function handleProfileSave() {
    toast.success(
      "Profile feature coming soon."
    );
  }

  function handlePasswordChange() {
    toast.success(
      "Password feature coming soon."
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Settings
        </h1>

        <p className="text-gray-500">
          Manage your account preferences
        </p>
      </div>

      {/* Profile */}

      <div className="rounded-xl bg-white p-6 shadow">
        <h2 className="mb-6 text-xl font-semibold">
          Profile
        </h2>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block font-medium">
              Name
            </label>

            <input
              value={profile.name}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  name: e.target.value,
                })
              }
              className="w-full rounded-lg border p-3"
              placeholder="Your Name"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Email
            </label>

            <input
              value={profile.email}
              disabled
              className="w-full rounded-lg border bg-gray-100 p-3"
            />
          </div>
        </div>

        <button
          onClick={handleProfileSave}
          className="mt-6 rounded-lg bg-green-600 px-6 py-2 text-white hover:bg-green-700"
        >
          Save Profile
        </button>
      </div>

      {/* Preferences */}

      <div className="rounded-xl bg-white p-6 shadow">
        <h2 className="mb-6 text-xl font-semibold">
          Preferences
        </h2>

        <div className="flex items-center justify-between">
          <span>Dark Mode</span>

          <button
            onClick={() =>
              setDarkMode(!darkMode)
            }
            className={`rounded-full px-4 py-2 text-white ${
              darkMode
                ? "bg-green-600"
                : "bg-gray-400"
            }`}
          >
            {darkMode
              ? "Enabled"
              : "Disabled"}
          </button>
        </div>
      </div>

      {/* Security */}

      <div className="rounded-xl bg-white p-6 shadow">
        <h2 className="mb-6 text-xl font-semibold">
          Security
        </h2>

        <button
          onClick={
            handlePasswordChange
          }
          className="rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
        >
          Change Password
        </button>
      </div>

      {/* Account */}

      <div className="rounded-xl bg-white p-6 shadow">
        <h2 className="mb-6 text-xl font-semibold text-red-600">
          Account
        </h2>

        <button
          onClick={handleLogout}
          className="rounded-lg bg-red-600 px-6 py-2 text-white hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
}