import { FiBell, FiLogOut, FiSearch } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { user } = useAuth();

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6 shadow-sm">
      {/* Logo */}
      <h1 className="text-xl font-bold text-green-600">
        Smart Pantry
      </h1>

      {/* Search */}
      <div className="hidden w-96 items-center rounded-lg border px-3 md:flex">
        <FiSearch className="mr-2 text-gray-400" />
        <input
          type="text"
          placeholder="Search..."
          className="w-full py-2 outline-none"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-5">
        <FiBell
          className="cursor-pointer text-xl text-gray-600"
        />

        <div className="hidden text-sm text-gray-600 lg:block">
          {user?.email}
        </div>

        <button>
          <FiLogOut
            className="text-xl text-red-500"
          />
        </button>
      </div>
    </header>
  );
}