import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { saveAdminToken } from "../../utils/auth";
import { motion } from "framer-motion";

const AdminLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        "https://booking-app-backend-api.onrender.com/api/admin/login",
        { email, password }
      );

      saveAdminToken(res.data.token);
      navigate("/admin");
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-950 overflow-hidden">
      {/* Animated Background Light Glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-primary/30 via-accent/10 to-transparent blur-3xl"
      />

      {/* Floating Particles for ambiance */}
      <motion.div
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.04)_0%,transparent_60%)] opacity-40"
      />

      {/* Login Card */}
      <motion.form
        onSubmit={handleLogin}
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 bg-white/10 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl p-10 w-[380px] text-center"
      >
        <h1 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary/80 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
          Login | DripCoat
        </h1>
        <p className="text-sm text-gray-400 mb-8 tracking-wide">
          Access your admin dashboard securely
        </p>

        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-500 text-sm mb-4"
          >
            {error}
          </motion.p>
        )}

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email address"
            className="w-full bg-black/40 text-white placeholder-gray-400 border border-white/20 rounded-lg p-3 focus:ring-2 focus:ring-accent/60 outline-none transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full bg-black/40 text-white placeholder-gray-400 border border-white/20 rounded-lg p-3 focus:ring-2 focus:ring-accent/60 outline-none transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Luxury glowing button */}
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(236,72,153,0.5)" }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          className="mt-8 w-full py-3 rounded-lg bg-gradient-to-r from-primary via-accent to-primary/80 text-white font-semibold tracking-wide shadow-lg shadow-primary/30 hover:shadow-accent/40 transition-all duration-300 ease-out relative overflow-hidden"
        >
          <span className="relative z-10">Log In</span>

          {/* Shimmer overlay */}
          <motion.span
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatDelay: 2,
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          />
        </motion.button>

        <p className="text-xs text-gray-500 mt-6">
          © {new Date().getFullYear()} DripCoat. All rights reserved.
        </p>
      </motion.form>
    </div>
  );
};

export default AdminLoginPage;
