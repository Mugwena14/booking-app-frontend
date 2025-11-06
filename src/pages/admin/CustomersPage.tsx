import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { User, Mail, Phone, Calendar, Clock, X, Search, Tag } from "lucide-react";

export default function CustomersPage() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [searchId, setSearchId] = useState("");
  const [searching, setSearching] = useState(false);
  const [exporting, setExporting] = useState(false);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://booking-app-backend-api.onrender.com/api/customers");
      setCustomers(res.data);
    } catch (err) {
      console.error("Error fetching customers:", err);
    } finally {
      setLoading(false);
    }
  };

  const searchCustomer = async () => {
    if (!searchId.trim()) {
      fetchCustomers();
      return;
    }

    try {
      setSearching(true);
      const res = await axios.get(
        `https://booking-app-backend-api.onrender.com/api/customers/${searchId.trim()}`
      );
      setCustomers([res.data]);
    } catch (err: any) {
      if (err.response?.status === 404) setCustomers([]);
      else console.error("Error searching customer:", err);
    } finally {
      setSearching(false);
    }
  };

  const toggleExpand = (id: string) => setExpanded((prev) => (prev === id ? null : id));

  const handleExport = () => {
    setExporting(true);
    try {
      const csvRows = [];
      const headers = ["Name", "Email", "Phone", "Service", "Booking Date"];
      csvRows.push(headers.join(","));

      customers.forEach((c) => {
        if (c.bookings?.length > 0) {
          c.bookings.forEach((b) => {
            csvRows.push(
              `${c.name},${c.email},${c.phone},${b.service?.title || ""},${new Date(
                b.date
              ).toLocaleString()}`
            );
          });
        } else {
          csvRows.push(`${c.name},${c.email},${c.phone},,`);
        }
      });

      const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "customers.csv";
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setExporting(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-white relative"
    >
      <h1 className="text-3xl font-bold mb-6">Customer Management</h1>

      {/* Search Section */}
      <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 mb-6">
        <input
          type="text"
          placeholder="Search by customer ID..."
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          className="bg-gray-900 border border-gray-700 text-white rounded-lg px-3 py-2 flex-1 min-w-[150px]"
        />

        <Button
          onClick={searchCustomer}
          disabled={searching}
          className={`flex items-center justify-center gap-2 rounded-lg transition-all px-4 py-2
            ${searching
              ? "bg-sky-600/50 text-gray-200 cursor-not-allowed"
              : "bg-sky-600 hover:bg-sky-700 text-white shadow-md hover:shadow-lg"
            }`}
        >
          {searching ? <span className="animate-pulse text-sm">Searching...</span> : <Search size={18} />}
        </Button>

        {searchId && (
          <Button
            variant="secondary"
            onClick={() => {
              setSearchId("");
              fetchCustomers();
            }}
            className="flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 
                       text-white transition-all px-3 py-2 shadow-md hover:shadow-lg"
          >
            <X size={18} />
          </Button>
        )}
      </div>

      {/* Customers List */}
      {loading ? (
        <p className="text-gray-400">Loading customers...</p>
      ) : customers.length === 0 ? (
        <Card className="p-6 bg-black/50 border-white/10">
          <p className="text-gray-400">No customers found.</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {customers.map((c) => (
            <Card key={c._id} className="p-4 bg-black/50 border-white/10 rounded-xl backdrop-blur-md">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                <div>
                  <p className="text-sm text-gray-400 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <span className="flex items-center gap-2">
                      <Mail size={14} /> {c.email}
                    </span>
                    <span className="flex items-center gap-2">
                      <Phone size={14} /> {c.phone}
                    </span>
                  </p>
                </div>

                <div className="flex gap-2 sm:justify-end">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => toggleExpand(c._id)}
                    className="bg-white/10 hover:bg-white/20 text-white rounded-lg px-4 py-2 transition-all shadow hover:shadow-md"
                  >
                    {expanded === c._id ? "Hide Details" : "View Bookings"}
                  </Button>
                </div>
              </div>

              <AnimatePresence>
                {expanded === c._id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 border-t border-white/10 pt-3 text-sm text-gray-300 space-y-2"
                  >
                    {c.bookings?.length > 0 ? (
                      c.bookings.map((b) => (
                        <div key={b._id} className="p-2 bg-white/10 rounded-md">
                          <p className="font-medium flex items-center gap-2">
                            <Tag size={14} /> {b.service?.title || "N/A"}
                          </p>
                          <p className="text-sm text-gray-300 flex items-center gap-2 flex-wrap">
                            <Calendar size={14} /> {new Date(b.date).toLocaleString()} —{" "}
                            <Clock size={14} /> {b.time || ""}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500">No bookings.</p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          ))}
        </div>
      )}

      {/* Export Button: Fixed on Mobile */}
      <Button
        onClick={handleExport}
        disabled={exporting}
        className={`px-6 py-3 rounded-lg text-white transition-all shadow-md hover:shadow-lg
          ${
            exporting
              ? "bg-green-600/50 text-gray-200 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }
          fixed bottom-4 right-4 sm:static sm:mt-6 sm:block`}
      >
        {exporting ? "Exporting..." : "Export to CSV"}
      </Button>
    </motion.div>
  );
}
