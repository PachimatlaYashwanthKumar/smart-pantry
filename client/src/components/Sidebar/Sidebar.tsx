import { NavLink } from "react-router-dom";
import {
  FiBarChart2,
  FiBox,
  FiGrid,
  FiSettings,
  FiShoppingCart,
  FiArchive,
} from "react-icons/fi";

const links = [
  {
    name: "🏠 Dashboard",
    path: "/dashboard",
    icon: <FiGrid size={18} />,
  },
  {
    name: "📦 Products",
    path: "/products",
    icon: <FiBox size={18} />,
  },
  {
    name: "🛒 Purchases",
    path: "/purchases",
    icon: <FiShoppingCart size={18} />,
  },
  {
    name: "🥫 Pantry",
    path: "/pantry",
    icon: <FiArchive size={18} />,
  },
  {
    name: "📝 Shopping",
    path: "/shopping",
    icon: <FiShoppingCart />,
  },
  {
    name: "📊 Analytics",
    path: "/analytics",
    icon: <FiBarChart2 size={18} />,
  },
  {
    name: "⚙️ Settings",
    path: "/settings",
    icon: <FiSettings size={18} />,
  },
];

export default function Sidebar() {
  return (
    <aside className="flex h-[calc(100vh-64px)] w-64 flex-col border-r bg-white shadow-sm">
      <div className="border-b p-6">
        <h2 className="text-lg font-bold text-green-600">
          Navigation
        </h2>

        <p className="text-sm text-gray-500">
          Smart Pantry
        </p>
      </div>

      <nav className="flex-1 p-4">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `mb-2 flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-green-600 text-white shadow"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            {link.icon}
            {link.name}
          </NavLink>
        ))}
      </nav>

      <div className="border-t p-4 text-center text-xs text-gray-400">
        Smart Pantry v1.0
      </div>
    </aside>
  );
}