import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  services: [],
  loading: false,
  error: null,
};

//Fetch all services
export const fetchServices = createAsyncThunk(
  "services/fetchServices",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("https://booking-app-backend-api.onrender.com/api/services");
      return res.data; // array of services
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch services");
    }
  }
);

// Create a new service
export const createService = createAsyncThunk(
  "services/createService",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post("https://booking-app-backend-api.onrender.com/api/services", payload);
      return res.data; 
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to create service");
    }
  }
);

// Update a service
export const updateService = createAsyncThunk(
  "services/updateService",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`https://booking-app-backend-api.onrender.com/api/services/${id}`, data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to update service");
    }
  }
);

// Delete a service
export const deleteService = createAsyncThunk(
  "services/deleteService",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`https://booking-app-backend-api.onrender.com/api/services/${id}`);
      return id; 
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to delete service");
    }
  }
);

// Seed default services
export const seedServices = createAsyncThunk(
  "services/seedServices",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.post("https://booking-app-backend-api.onrender.com/api/services/seed");
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to seed services");
    }
  }
);

// Slice
const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    clearServiceError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create
      .addCase(createService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createService.fulfilled, (state, action) => {
        state.loading = false;
        state.services.push(action.payload);
      })
      .addCase(createService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update
      .addCase(updateService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateService.fulfilled, (state, action) => {
        state.loading = false;
        state.services = state.services.map((s) =>
          s._id === action.payload._id ? action.payload : s
        );
      })
      .addCase(updateService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(deleteService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteService.fulfilled, (state, action) => {
        state.loading = false;
        state.services = state.services.filter((s) => s._id !== action.payload);
      })
      .addCase(deleteService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Seed
      .addCase(seedServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(seedServices.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload; 
      })
      .addCase(seedServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearServiceError } = servicesSlice.actions;
export default servicesSlice.reducer;
