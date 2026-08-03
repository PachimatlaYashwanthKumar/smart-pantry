import { NavLink } from "react-router-dom";
import {
  FiBarChart2,
  FiBox,
  FiGrid,
  FiSettings,
  FiShoppingCart,
} from "react-icons/fi";

const links = [
  {
    name: "Dashboard",
    path: "/",
    icon: <FiGrid />,
  },
  {
    name: "Products",
    path: "/products",
    icon: <FiBox />,
  },
  {
    name: "Pantry",
    path: "/pantry",
    icon: <FiBox />,
  },
  {
    name: "Purchases",
    path: "/purchases",
    icon: <FiShoppingCart />,
  },
  {
    name: "Analytics",
    path: "/analytics",
    icon: <FiBarChart2 />,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: <FiSettings />,
  },
];

export default function Sidebar() {
  return (
    <aside className="w-64 border-r bg-white">
      <nav className="flex flex-col p-4">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end={link.path === "/"}
            className={({ isActive }) =>
              `mb-2 flex items-center gap-3 rounded-lg px-4 py-3 transition ${
                isActive
                  ? "bg-green-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            {link.icon}
            {link.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}