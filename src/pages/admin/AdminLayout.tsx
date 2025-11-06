import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import DarkVeil from "../DarkVeil.tsx";
import {
  LogOut,
  Calendar,
  Users,
  Settings,
  Home,
  List,
  Menu,
  X,
} from "lucide-react";
import { logoutAdmin } from "@/utils/auth";

export default function AdminLayout() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: "Overview", path: "/admin", icon: Home },
    { name: "Bookings", path: "/admin/bookings", icon: Calendar },
    // { name: "Availability", path: "/admin/availability", icon: Settings },
    { name: "Customers", path: "/admin/customers", icon: Users },
    { name: "Services", path: "/admin/services", icon: List },
  ];

  const handleLogout = () => {
    logoutAdmin();
    navigate("/");
  };

  return (
    <div className="flex min-h-screen min-w-screen text-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <DarkVeil />
      </div>

      {/* Mobile Top Nav */}
      <div className="fixed top-0 left-0 w-full z-20 bg-black/50 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-5 py-3 md:hidden">
        <h1 className="text-lg font-bold tracking-wide">Admin</h1>
        <button
          onClick={() => setMenuOpen(true)}
          className="p-2 rounded-md hover:bg-white/10 transition"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Sidebar (Desktop) */}
      <motion.aside
        initial={{ x: 0, opacity: 1 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="hidden md:flex relative z-10 w-64 bg-black/40 border-r border-white/10 backdrop-blur-md p-6 flex-col justify-between"
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

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition"
        >
          <LogOut size={18} /> Logout
        </button>
      </motion.aside>

      {/* Mobile Sidebar Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.aside
            key="mobile-sidebar"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="fixed top-0 right-0 z-30 w-64 h-full bg-black/80 backdrop-blur-lg p-6 flex flex-col justify-between"
          >
            <div>
              {/* Close Button */}
              <button
                onClick={() => setMenuOpen(false)}
                className="absolute top-4 right-4 text-gray-300 hover:text-white"
              >
                <X size={24} />
              </button>

              <h1 className="text-2xl font-bold mb-8 text-center mt-8">
                Admin Panel
              </h1>

              <nav className="flex flex-col gap-3 mt-4">
                {navItems.map(({ name, path, icon: Icon }) => (
                  <NavLink
                    key={path}
                    to={path}
                    end={path === "/admin"}
                    onClick={() => setMenuOpen(false)}
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

            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition"
            >
              <LogOut size={18} /> Logout
            </button>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="flex-1 relative z-10 p-6 md:p-10 overflow-y-auto pt-16 md:pt-0"
      >
        <Outlet />
      </motion.main>
    </div>
  );
}
