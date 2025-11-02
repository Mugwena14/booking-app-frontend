import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DarkVeil from "./DarkVeil";
import { Copy } from "lucide-react"; 

export default function BookingSummaryPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const booking = (location.state as any)?.booking;

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (booking?._id) {
      navigator.clipboard.writeText(booking._id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!booking) {
    return (
      <div style={{ width: "100%", height: "600px", position: "relative" }}>
        <DarkVeil />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white/6 p-6 rounded-xl text-center">
            <div className="mb-2">No booking found.</div>
            <button
              onClick={() => navigate("/")}
              className="px-3 py-2 bg-sky-600 text-white rounded"
            >
              Go Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ width: "100%", height: "600px", position: "relative" }}>
      <DarkVeil />
      <div className="absolute inset-0 p-6 flex items-center justify-center">
        <div className="bg-white/6 max-w-xl w-full p-6 rounded-2xl">
          <h1 className="text-2xl font-bold mb-3 text-center text-white">
            Booking Confirmed 🎉
          </h1>

          <p className="mb-4 text-center text-sm text-gray-300">
            Please <span className="font-semibold text-white">copy</span> or{" "}
            <span className="font-semibold text-white">screenshot</span> your booking ID below.
            You’ll need it for verification or future reference.
          </p>

          {/* Booking ID box with copy button */}
          <div className="mb-4 bg-white/10 p-3 rounded-lg flex items-center justify-between">
            <div className="text-sm text-white font-mono break-all">
              {booking._id}
            </div>
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-3 py-1 text-sm bg-sky-600 hover:bg-sky-700 text-white rounded transition"
            >
              <Copy size={16} />
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>

          <div className="mb-2">
            <div className="text-sm text-muted-foreground">Service</div>
            <div className="font-medium text-white">{booking.service?.name}</div>
          </div>

          <div className="mb-2">
            <div className="text-sm text-muted-foreground">Date & Time</div>
            <div className="font-medium text-white">
              {booking.date} {booking.time ? `@ ${booking.time}` : ""}
            </div>
          </div>

          <div className="mb-4">
            <div className="text-sm text-muted-foreground">Status</div>
            <div className="font-medium text-white">{booking.status}</div>
          </div>

          <div className="mt-6 flex justify-center">
            <button
              onClick={() => navigate("/")}
              className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg transition-all"
            >
              Go to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
