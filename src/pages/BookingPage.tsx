import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";

import DarkVeil from "./DarkVeil";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setStep,
  selectService,
  selectDate,
  selectTime,
  updateVehicle,
  updateCustomer,
  resetBooking,
} from "@/store/slices/bookingSlice";
import { fetchServices } from "@/store/slices/servicesSlice";
import { fetchAvailability } from "@/store/slices/availabilitySlice";
import axios from "axios";

// ----------------------------
// Types
// ----------------------------
interface Service { _id: string; title: string; description: string; price: number; duration: number; }
interface Vehicle { make?: string; model?: string; year?: string; color?: string; plate?: string; }
interface Customer { name?: string; phone?: string; email?: string; }
interface BookingState { step: number; service: Service | null; date: string | null; time: string | null; vehicle: Vehicle; customer: Customer; }
interface Availability { workingDays?: string[]; workingHours?: { start: string; end: string }; slotsPerHour?: number; }
interface RootState { services: { services: Service[] }; booking: BookingState; availability: { data: Availability | null; loading: boolean }; }
interface UnavailableSlot { date: string; startTime: string; endTime: string; _id: string; }

// ----------------------------
// Component
// ----------------------------
export default function BookingPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const services = useAppSelector((state: RootState) => state.services.services || []);
  const booking = useAppSelector((state: RootState) => state.booking);
  const availabilityState = useAppSelector((state: RootState) => state.availability);
  const { data: availability, loading: availabilityLoading } = availabilityState;

  const { step, service, date, time, vehicle, customer } = booking;
  const preselectedId = (location.state as { serviceId?: string })?.serviceId;

  // ----------------------------
  // Helper functions
  // ----------------------------
  const formatISODate = (iso: string | Date) => {
    const d = new Date(iso);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const today = useMemo(() => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; }, []);
  const addDays = (base: Date, n: number) => { const d = new Date(base); d.setDate(d.getDate() + n); return d; };
  const next7 = useMemo(() => Array.from({ length: 7 }).map((_, i) => { const d = addDays(today, i); return { date: d, iso: formatISODate(d), weekday: d.toLocaleDateString(undefined, { weekday: "short" }) }; }), [today]);

  const [slotsForSelectedDate, setSlotsForSelectedDate] = useState<{ time: string; available: boolean }[]>([]);
  const [unavailableSlots, setUnavailableSlots] = useState<UnavailableSlot[]>([]);
  const [exhaustedDates, setExhaustedDates] = useState<string[]>([]);

  // ----------------------------
  // Fetch Data
  // ----------------------------
  useEffect(() => { dispatch(fetchServices()); dispatch(fetchAvailability()); }, [dispatch]);

  useEffect(() => {
    if (preselectedId && !service && services.length > 0) {
      const pre = services.find((s) => s._id === preselectedId);
      if (pre) dispatch(selectService(pre));
    }
  }, [preselectedId, dispatch, service, services]);

  useEffect(() => {
    const fetchExhaustedDates = async () => {
      try {
        const from = formatISODate(today);
        const to = formatISODate(addDays(today, 7));
        const { data } = await axios.get(`https://booking-app-backend-api.onrender.com/api/bookings/exhausted`, { params: { from, to } });
        setExhaustedDates(data || []);
      } catch (err) { console.error("Error fetching exhausted dates:", err); }
    };
    fetchExhaustedDates();
  }, [today]);

  useEffect(() => {
    const fetchUnavailableSlots = async () => {
      try {
        const { data } = await axios.get("https://booking-app-backend-api.onrender.com/api/availability/unavailable");
        setUnavailableSlots(data || []);
      } catch (err) { console.error("Error fetching unavailable slots:", err); }
    };
    fetchUnavailableSlots();
  }, []);

  useEffect(() => {
    const fetchSlots = async () => {
      if (!service?._id || !date) return;
      try {
        const { data } = await axios.get(`https://booking-app-backend-api.onrender.com/api/bookings/slots`, { params: { serviceId: service._id, date } });
        setSlotsForSelectedDate(data || []);
      } catch (err) { console.error("Error fetching slots:", err); }
    };
    fetchSlots();
  }, [service?._id, date]);

  // ----------------------------
  // Handlers
  // ----------------------------
  const handleNext = () => {
    if (step === 0 && !service?._id) return;
    if (step === 1 && (!date || !time)) return;
    if (step === 2 && !customer.name) return;
    dispatch(setStep(step + 1));
  };

  const handleConfirm = async () => {
    if (!service || !date || !time || !customer.name || !customer.phone) return;
    try {
      const bookingData = { serviceId: service._id, date, time, vehicle, customer };
      const { data } = await axios.post(`https://booking-app-backend-api.onrender.com/api/bookings`, bookingData);
      navigate("/summary", { state: { booking: data } });
      dispatch(resetBooking());
    } catch (err) { console.error("Booking creation failed:", err); alert("Failed to confirm booking. Please try again."); }
  };

  const isDateExhausted = (iso: string) => {
    if (exhaustedDates.includes(iso)) return true;
    const daySlots = unavailableSlots.filter(s => formatISODate(s.date) === iso);
    return daySlots.some(s => s.startTime === "00:00" && s.endTime === "23:59");
  };

  // ----------------------------
  // Time Slots Generation
  // ----------------------------
  const workingHours = { start: 8, end: 16 };
  const generateAllSlots = () => {
    const slots: { time: string; available: boolean }[] = [];
    for (let hour = workingHours.start; hour < workingHours.end; hour++) {
      const h = String(hour).padStart(2, "0");
      slots.push({ time: `${h}:00`, available: true });
    }
    return slots;
  };

  const allSlots = generateAllSlots();

  // compute unavailable slots for selected date
  const unavailableTodayRanges = date
    ? unavailableSlots.filter(u => formatISODate(u.date) === formatISODate(date))
    : [];

  // mark each slot as available or unavailable
  const slotsWithAvailability = allSlots.map(slot => {
    const isBlocked = unavailableTodayRanges.some(u => {
      const slotMinutes = parseInt(slot.time.split(":")[0]) * 60 + parseInt(slot.time.split(":")[1]);
      const startMinutes = parseInt(u.startTime.split(":")[0]) * 60 + parseInt(u.startTime.split(":")[1]);
      const endMinutes = parseInt(u.endTime.split(":")[0]) * 60 + parseInt(u.endTime.split(":")[1]);
      return slotMinutes >= startMinutes && slotMinutes < endMinutes;
    });
    return { ...slot, available: !isBlocked };
  });

  // ----------------------------
  // UI
  // ----------------------------
  return (
    <div style={{ width: "100%", height: "800px", position: "relative" }}>
      <DarkVeil />
      <div className="absolute inset-0 p-6 overflow-auto">
        <div className="max-w-4xl mx-auto bg-white/6 backdrop-blur rounded-2xl p-6 shadow-lg">
          <h1 className="text-2xl font-bold mb-4 text-white">Book a Service</h1>

          {/* Stepper */}
          <div className="mb-6">
            {/* Desktop: show all steps */}
            <div className="hidden md:flex items-center gap-4">
              {["Service", "Date & Time", "Vehicle & Contact", "Confirm"].map((label, i) => (
                <div key={label} className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition ${
                      i === step
                        ? "bg-sky-600 text-white"
                        : i < step
                        ? "bg-green-600 text-white"
                        : "bg-white/10 text-white"
                    }`}
                  >
                    {i + 1}
                  </div>
                  <div className="text-sm text-white/90">{label}</div>
                </div>
              ))}
            </div>

            {/* Mobile: show only current step (left-aligned) */}
            <div className="flex items-center md:hidden text-left gap-3">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center transition ${
                  step === 0
                    ? "bg-sky-600 text-white"
                    : step === 1
                    ? "bg-blue-600 text-white"
                    : step === 2
                    ? "bg-purple-600 text-white"
                    : "bg-green-600 text-white"
                }`}
              >
                {step + 1}
              </div>
              <div className="text-sm text-white/90 font-medium">
                {["Service", "Date & Time", "Vehicle & Contact", "Confirm"][step]}
              </div>
            </div>
          </div>

          {/* Steps */}
          <AnimatePresence mode="wait">
            {/* Step 0 - Service */}
            {step === 0 && (
              <motion.div
                key="step-service"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h2 className="text-lg font-semibold mb-3 text-white">Choose a Service</h2>

                {services.length === 0 ? (
                  <div className="text-gray-400 text-sm animate-pulse">Loading services...</div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {services.map((s) => {
                      const isSelected = service?._id === s._id;
                      return (
                        <button
                          key={s._id}
                          onClick={() => dispatch(selectService(s))}
                          className={`p-4 rounded-xl transition text-left ${
                            isSelected
                              ? "ring-2 ring-sky-500 bg-sky-600/20"
                              : "bg-white/5 hover:bg-white/10"
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="text-lg font-medium text-white">{s.title}</div>
                              <div className="text-sm text-gray-400">{s.description}</div>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold text-white">R {s.price}</div>
                              <div className="text-sm text-gray-300">{s.duration} mins</div>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            )}

            {/* Step 1 - Date & Time */}
            {step === 1 && (
              <motion.div
                key="step-date"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h2 className="text-lg font-semibold mb-3 text-white">Pick a Date</h2>

                {availabilityLoading ? (
                  <div className="text-sm text-gray-400">Loading availability...</div>
                ) : (
                  <>
                    {/* Swipe Alert (only on mobile) */}
                    <div className="md:hidden text-xs text-gray-400 mb-2 flex items-center gap-1">
                      <motion.span
                        animate={{ x: [0, 10, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="inline-block"
                      >
                        👉
                      </motion.span>
                      <span className="ml-1">Swipe to see more dates</span>
                    </div>

                    {/* Date Buttons */}
                    <div className="flex gap-3 mb-4 overflow-x-auto scrollbar-hide">
                      {next7.map((d) => {
                        const disabled = isDateExhausted(d.iso);
                        return (
                          <button
                            key={d.iso}
                            disabled={disabled}
                            onClick={() => !disabled && dispatch(selectDate(d.iso))}
                            className={`min-w-[90px] p-3 rounded-lg text-left ${
                              date === d.iso
                                ? "ring-2 ring-sky-500 bg-white/10"
                                : "bg-white/5 hover:bg-white/10"
                            } ${
                              disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"
                            } text-white transition`}
                          >
                            <div className="text-sm">{d.weekday}</div>
                            <div className="text-sm font-medium">{d.iso}</div>
                            {disabled && <div className="text-xs mt-1">Unavailable</div>}
                          </button>
                        );
                      })}
                    </div>

                    {/* Unavailable times */}
                    {unavailableTodayRanges.length > 0 && (
                      <div className="mb-2 text-sm text-red-400">
                        Unavailable times for this day:{" "}
                        {unavailableTodayRanges
                          .map((u) => `${u.startTime}–${u.endTime}`)
                          .join(", ")}
                      </div>
                    )}

                    {/* Time Slots */}
                    <div>
                      <h3 className="text-sm font-medium mb-2 text-white">
                        Available time slots
                      </h3>
                      {date ? (
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          {slotsWithAvailability.map((slot) => {
                            const isDisabled = !slot.available;
                            const isSelected = time === slot.time;
                            return (
                              <button
                                key={slot.time}
                                disabled={isDisabled}
                                onClick={() =>
                                  !isDisabled && dispatch(selectTime(slot.time))
                                }
                                className={`p-2 rounded-lg text-sm transition ${
                                  isSelected
                                    ? "bg-sky-600 text-white"
                                    : !slot.available
                                    ? "bg-red-900/40 text-red-300"
                                    : "bg-white/5 text-white hover:bg-white/10"
                                } ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
                              >
                                {slot.time}
                              </button>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="text-sm text-gray-400">Select a date first</div>
                      )}
                    </div>
                  </>
                )}
              </motion.div>
            )}


            {/* Step 2 - Vehicle & Contact */}
            {step === 2 && (
              <motion.div
                key="step-vehicle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h2 className="text-lg font-semibold mb-3 text-white">
                  Vehicle & Contact
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2 text-gray-300">
                      Vehicle Details
                    </h3>
                    {["make", "model", "year", "color", "plate"].map((key) => (
                      <input
                        key={key}
                        placeholder={key}
                        value={(vehicle as any)[key] || ""}
                        onChange={(e) =>
                          dispatch(updateVehicle({ [key]: e.target.value }))
                        }
                        className="w-full p-2 mb-2 rounded bg-white/5 text-white placeholder-gray-400"
                      />
                    ))}
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-2 text-gray-300">Contact</h3>
                    {["name", "phone", "email"].map((key) => (
                      <input
                        key={key}
                        placeholder={key}
                        value={(customer as any)[key] || ""}
                        onChange={(e) =>
                          dispatch(updateCustomer({ [key]: e.target.value }))
                        }
                        className="w-full p-2 mb-2 rounded bg-white/5 text-white placeholder-gray-400"
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3 - Confirm */}
            {step === 3 && (
              <motion.div
                key="step-confirm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h2 className="text-lg font-semibold mb-3 text-white">
                  Confirm Booking
                </h2>
                <div className="space-y-3 text-white">
                  <div>
                    <div className="text-sm text-gray-400">Service</div>
                    <div className="font-medium">{service?.title || "-"}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Date & Time</div>
                    <div className="font-medium">
                      {date || "-"} {time ? `@ ${time}` : ""}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Vehicle</div>
                    <div className="font-medium">
                      {vehicle.make} {vehicle.model} ({vehicle.year}) -{" "}
                      {vehicle.plate}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Contact</div>
                    <div className="font-medium">
                      {customer.name} — {customer.phone} — {customer.email}
                    </div>
                  </div>
                  <div className="pt-3 flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={handleConfirm}
                      disabled={!service || !date || !time || !customer.name}
                      className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-60"
                    >
                      Confirm Booking
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          <div className="mt-6 flex items-center justify-between flex-wrap gap-3">
            {step > 0 && (
              <button
                onClick={() => dispatch(setStep(step - 1))}
                className="px-3 py-1 bg-white/5 rounded text-white w-full sm:w-auto"
              >
                Back
              </button>
            )}
            <div className="flex gap-2 w-full sm:w-auto justify-end">
              {step < 3 && (
                <button
                  onClick={handleNext}
                  className="px-4 py-2 bg-sky-600 text-white rounded w-full sm:w-auto"
                >
                  Next
                </button>
              )}
              <button
                onClick={() => navigate("/", { replace: true })}
                className="px-4 py-2 bg-white/5 text-white rounded w-full sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
