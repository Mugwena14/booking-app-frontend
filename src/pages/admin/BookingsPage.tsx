import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import axios from "axios";
import {
  Calendar,
  Clock,
  Phone,
  Mail,
  Car,
  Tag,
  User,
  Hash,
  Search,
  X,
  Eye,
  Trash2,
} from "lucide-react";

export default function BookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [searchId, setSearchId] = useState("");
  const [searching, setSearching] = useState(false);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "https://booking-app-backend-api.onrender.com/api/bookings"
      );
      setBookings(res.data);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  const searchBooking = async () => {
    if (!searchId.trim()) {
      fetchBookings();
      return;
    }

    try {
      setSearching(true);
      const res = await axios.get(
        `https://booking-app-backend-api.onrender.com/api/bookings/${searchId.trim()}`
      );
      setBookings([res.data]);
    } catch (err: any) {
      if (err.response?.status === 404) {
        setBookings([]);
      } else {
        console.error("Error searching booking:", err);
      }
    } finally {
      setSearching(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      await axios.patch(
        `https://booking-app-backend-api.onrender.com/api/bookings/${id}/status`,
        { status: newStatus }
      );
      setBookings((prev) =>
        prev.map((b) => (b._id === id ? { ...b, status: newStatus } : b))
      );
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const deleteBooking = async (id: string) => {
    if (!confirm("Are you sure you want to delete this booking?")) return;
    try {
      await axios.delete(
        `https://booking-app-backend-api.onrender.com/api/bookings/${id}`
      );
      setBookings((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      console.error("Error deleting booking:", err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const toggleExpand = (id: string) => {
    setExpanded((prev) => (prev === id ? null : id));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-white"
    >
      <h1 className="text-3xl font-bold mb-6">Booking Management</h1>

      {/* Search Section */}
      <div className="flex items-center gap-2 mb-6">
        <input
          type="text"
          placeholder="Search by booking ID..."
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          className="bg-gray-900 border border-gray-700 text-white rounded-lg px-3 py-2 w-full"
        />
      <Button
          onClick={searchBooking}
          disabled={searching}
          className={`flex items-center justify-center gap-2 rounded-xl transition-all px-4 py-2 
            ${searching
              ? "bg-sky-600/50 text-gray-200 cursor-not-allowed"
              : "bg-sky-600 hover:bg-sky-700 text-white shadow-md hover:shadow-lg"
            }`}
        >
          {searching ? (
            <span className="animate-pulse text-sm">Searching...</span>
          ) : (
            <Search size={18} />
          )}
        </Button>

      {/* Clear (X) Button */}
      {searchId && (
        <Button
          variant="secondary"
          onClick={() => {
            setSearchId("");
            fetchBookings();
          }}
          className="flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 
                    text-white transition-all px-3 py-2 shadow-md hover:shadow-lg"
        >
          <X size={18} />
        </Button>
        )}
      </div>

      {loading ? (
        <p className="text-gray-400">Loading bookings...</p>
      ) : (
        <div className="space-y-4">
          {bookings.length === 0 ? (
            <Card className="p-6 bg-black/50 border-white/10">
              <p className="text-gray-400">No bookings found.</p>
            </Card>
          ) : (
            bookings.map((b) => (
              <Card
                key={b._id}
                className="p-4 bg-black/50 border-white/10 rounded-xl"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">
                  {/* Customer Info */}
                  <div>
                    <p className="font-semibold flex items-center gap-2">
                      <User size={16} /> {b.customer?.name}
                    </p>
                    <p className="text-sm text-gray-400 flex items-center gap-2">
                      <Calendar size={14} /> {b.date} — <Clock size={14} />{" "}
                      {b.time}
                    </p>
                    <p className="text-xs text-gray-500">Status: {b.status}</p>
                  </div>
                </div>

                {/* Controls Row: Dropdown Left, Buttons Right */}
                <div className="flex justify-between items-center mt-3 flex-wrap gap-3">
                  {/* Dropdown on the left */}
                  <select
                    className="bg-black/60 backdrop-blur-md text-gray-200 border border-sky-700/40 rounded-lg px-3 py-1.5 text-sm shadow-md focus:outline-none focus:ring-2 focus:ring-sky-600 transition-all"
                    value={b.status}
                    onChange={(e) => updateStatus(b._id, e.target.value)}
                  >
                    <option value="PENDING" className="bg-gray-900 text-white">
                      PENDING
                    </option>
                    <option value="CONFIRMED" className="bg-gray-900 text-white">
                      CONFIRMED
                    </option>
                    <option value="COMPLETED" className="bg-gray-900 text-white">
                      COMPLETED
                    </option>
                    <option value="CANCELLED" className="bg-gray-900 text-white">
                      CANCELLED
                    </option>
                  </select>

                  {/* Buttons on the right */}
                  <div className="flex gap-2 justify-end flex-1">
                    {/* Desktop buttons */}
                    <div className="hidden sm:flex gap-2">
                      <button
                        onClick={() => toggleExpand(b._id)}
                        className="bg-gradient-to-r from-sky-600 to-blue-500 text-white font-medium px-4 py-1.5 text-sm rounded-lg shadow-md hover:shadow-blue-600/40 hover:scale-105 active:scale-95 transition-all duration-300"
                      >
                        {expanded === b._id ? "Hide Details" : "View Details"}
                      </button>
                      <button
                        onClick={() => deleteBooking(b._id)}
                        className="bg-gradient-to-r from-red-700 to-red-600 text-white px-4 py-1.5 text-sm rounded-lg shadow-md hover:shadow-red-600/40 hover:scale-105 active:scale-95 transition-all duration-300"
                      >
                        Delete
                      </button>
                    </div>

                    {/* Mobile icons */}
                    <div className="flex sm:hidden gap-2">
                      <button
                        onClick={() => toggleExpand(b._id)}
                        className="bg-gradient-to-r from-sky-600 to-blue-500 text-white p-2 rounded-lg shadow-md hover:shadow-blue-600/40 hover:scale-105 active:scale-95 transition-all duration-300"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => deleteBooking(b._id)}
                        className="bg-gradient-to-r from-red-700 to-red-600 text-white p-2 rounded-lg shadow-md hover:shadow-red-600/40 hover:scale-105 active:scale-95 transition-all duration-300"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                <AnimatePresence>
                  {expanded === b._id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 border-t border-white/10 pt-3 text-sm text-gray-300 space-y-2"
                    >
                      {/* Responsive grid fix */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <p className="flex items-center gap-2">
                          <Tag size={14} /> <strong>Service:</strong>{" "}
                          {b.service?.title || "N/A"}
                        </p>
                        <p className="flex items-center gap-2">
                          <Tag size={14} /> <strong>Price:</strong>{" "}
                          {b.service?.price ? `R${b.service.price}` : "N/A"}
                        </p>
                        <p className="flex items-center gap-2">
                          <Phone size={14} /> <strong>Phone:</strong>{" "}
                          {b.customer?.phone || "N/A"}
                        </p>
                        {b.customer?.email && (
                          <p className="flex items-center gap-2">
                            <Mail size={14} /> <strong>Email:</strong>{" "}
                            {b.customer.email}
                          </p>
                        )}
                        {b.vehicle && (
                          <p className="flex items-center gap-2">
                            <Car size={14} /> <strong>Vehicle:</strong>{" "}
                            {b.vehicle.make || ""} {b.vehicle.model || ""}{" "}
                            {b.vehicle.plate || ""}
                          </p>
                        )}
                      </div>

                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <Hash size={12} /> Booking ID: {b._id}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            ))
          )}
        </div>
      )}
    </motion.div>
  );
}
