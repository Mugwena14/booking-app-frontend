import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: null,
  data: null,
};

// Fetch global availability (default config)
export const fetchAvailability = createAsyncThunk(
  "availability/fetchAvailability",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("https://booking-app-backend-api.onrender.com/api/availability");
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || "Error fetching availability"
      );
    }
  }
);

// Fetch time slots for a specific service and date
export const fetchSlotsForDate = createAsyncThunk(
  "availability/fetchSlotsForDate",
  async ({ serviceId, date }, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `https://booking-app-backend-api.onrender.com/api/availability/slots?serviceId=${serviceId}&date=${date}`
      );
      return res.data; // Expect an array of slots
    } catch (err) {
      return rejectWithValue(
        err.response?.data || "Error fetching slots"
      );
    }
  }
);

const availabilitySlice = createSlice({
  name: "availability",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAvailability.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAvailability.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAvailability.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Slots for a date
      .addCase(fetchSlotsForDate.pending, (state) => {
        if (state.data) state.data.availableSlots = [];
        state.loading = true;
      })
      .addCase(fetchSlotsForDate.fulfilled, (state, action) => {
        state.loading = false;
        if (!state.data) {
          state.data = {
            workingDays: [],
            workingHours: { start: "09", end: "17" },
            slotsPerHour: 2,
            availableSlots: [],
          };
        }
        state.data.availableSlots = action.payload;
      })
      .addCase(fetchSlotsForDate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default availabilitySlice.reducer;
