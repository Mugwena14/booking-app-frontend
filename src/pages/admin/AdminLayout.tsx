import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import DarkVeil from "../DarkVeil.tsx";
import { LogOut, Calendar, Users, Settings, Home, List } from "lucide-react";
import { logoutAdmin } from "@/utils/auth";

export default function AdminLayout() {
  const navigate = useNavigate();

  const navItems = [
    { name: "Overview", path: "/admin", icon: Home },
    { name: "Bookings", path: "/admin/bookings", icon: Calendar },
    { name: "Availability", path: "/admin/availability", icon: Settings },
    { name: "Customers", path: "/admin/customers", icon: Users },
    { name: "Services", path: "/admin/services", icon: List },
  ];

  // Logout handler
  const handleLogout = () => {
    logoutAdmin(); 
    navigate("/");
  };

  return (
    <div className="flex min-h-screen text-white relative">
      {/* Background */}
      <div className="absolute inset-0">
        <DarkVeil />
      </div>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-64 bg-black/40 border-r border-white/10 backdrop-blur-md p-6 flex flex-col justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold mb-8 text-center">Admin Panel</h1>

          <nav className="flex flex-col gap-3">
            {navItems.map(({ name, path, icon: Icon }) => (
              <NavLink
                key={path}
                to={path}
                end={path === "/admin"}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-xl transition ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "text-gray-300 hover:bg-white/10 hover:text-white"
                  }`
                }
              >
                <Icon size={18} />
                {name}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition"
        >
          <LogOut size={18} /> Logout
        </button>
      </motion.aside>

      {/* Main Content */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="flex-1 relative z-10 p-10 overflow-y-auto"
      >
        <Outlet />
      </motion.main>
    </div>
  );
}
