import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

// Thunk to create a booking
export const createBooking = createAsyncThunk(
  "booking/createBooking",
  async (bookingData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE}/bookings`, bookingData);
      return response.data;
    } catch (err) {
      console.error("Booking creation failed:", err);
      return rejectWithValue(err.response?.data || { message: "Unknown error" });
    }
  }
);

const initialState = {
  step: 0,
  service: null,
  date: null,
  time: null,
  vehicle: {
    make: "",
    model: "",
    year: "",
    color: "",
    plate: "",
  },
  customer: {
    name: "",
    phone: "",
    email: "",
  },
  loading: false,
  error: null,
  success: false,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setStep: (state, action) => {
      state.step = action.payload;
    },
    selectService: (state, action) => {
      state.service = action.payload;
      state.step = 1;
    },
    selectDate: (state, action) => {
      state.date = action.payload;
      state.time = null;
    },
    selectTime: (state, action) => {
      state.time = action.payload;
    },
    updateVehicle: (state, action) => {
      state.vehicle = { ...state.vehicle, ...action.payload };
    },
    updateCustomer: (state, action) => {
      state.customer = { ...state.customer, ...action.payload };
    },
    resetBooking: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        console.log("Booking created:", action.payload);
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to create booking";
      });
  },
});

export const {
  setStep,
  selectService,
  selectDate,
  selectTime,
  updateVehicle,
  updateCustomer,
  resetBooking,
} = bookingSlice.actions;

export default bookingSlice.reducer;