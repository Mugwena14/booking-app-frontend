import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminAvailabilityPage() {
  const [slots, setSlots] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newSlot, setNewSlot] = useState({ date: "", startTime: "", endTime: "" });
  const [saving, setSaving] = useState(false);

  // Fetch unavailable slots
  const fetchSlots = async () => {
    try {
      const res = await axios.get("https://booking-app-backend-api.onrender.com/api/availability");
      setSlots(res.data.unavailableSlots || []);
    } catch (err) {
      console.error("Error fetching unavailable slots:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  const addSlot = async () => {
    if (!newSlot.date || !newSlot.startTime || !newSlot.endTime) return alert("Fill all fields");
    try {
      setSaving(true);
      const res = await axios.post("https://booking-app-backend-api.onrender.com/api/availability", newSlot);
      setSlots(res.data.record.unavailableSlots);
      setNewSlot({ date: "", startTime: "", endTime: "" });
    } catch (err) {
      console.error("Error adding slot:", err);
    } finally {
      setSaving(false);
    }
  };

  const deleteSlot = async (id: string) => {
    try {
      await axios.delete(`https://booking-app-backend-api.onrender.com/api/availability/${id}`);
      setSlots(slots.filter((s) => s._id !== id));
    } catch (err) {
      console.error("Error deleting slot:", err);
    }
  };

  if (loading) return <p className="text-gray-400">Loading unavailable slots...</p>;

  return (
    <div className="text-white">
      <h1 className="text-3xl font-bold mb-6">Admin Unavailability Settings</h1>

      <Card className="p-6 bg-black/50 border-white/10 space-y-6">
        {/* Add new slot */}
        <div className="flex flex-col md:flex-row items-center gap-3">
          <Input
            type="date"
            value={newSlot.date}
            onChange={(e) => setNewSlot({ ...newSlot, date: e.target.value })}
            className="bg-gray-900 border-gray-700 text-white"
          />
          <Input
            type="time"
            value={newSlot.startTime}
            onChange={(e) => setNewSlot({ ...newSlot, startTime: e.target.value })}
            className="bg-gray-900 border-gray-700 text-white"
          />
          <Input
            type="time"
            value={newSlot.endTime}
            onChange={(e) => setNewSlot({ ...newSlot, endTime: e.target.value })}
            className="bg-gray-900 border-gray-700 text-white"
          />
          <Button onClick={addSlot} disabled={saving}>
            {saving ? "Saving..." : "Add Unavailable Slot"}
          </Button>
        </div>

        {/* List unavailable slots */}
        <div className="space-y-2">
          <h2 className="text-lg font-semibold mb-2">Unavailable Dates & Times</h2>
          {slots.length === 0 && <p className="text-gray-400">No unavailable slots set.</p>}
          {slots.map((slot) => (
            <div
              key={slot._id}
              className="flex justify-between items-center bg-gray-800 p-3 rounded-md border border-gray-700"
            >
              <p>
                <span className="font-semibold">{slot.date}</span> — {slot.startTime} to{" "}
                {slot.endTime}
              </p>
              <Button variant="destructive" size="sm" onClick={() => deleteSlot(slot._id)}>
                Remove
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
