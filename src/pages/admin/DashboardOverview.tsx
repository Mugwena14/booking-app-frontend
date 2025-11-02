import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

export default function DashboardOverview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-white"
    >
      <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {["Upcoming Bookings", "Total Revenue", "Daily Calendar"].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="p-6 bg-black/50 border-white/10 rounded-2xl shadow-md">
              <h2 className="text-xl font-semibold mb-2">{item}</h2>
              <p className="text-gray-400">Coming soon...</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
