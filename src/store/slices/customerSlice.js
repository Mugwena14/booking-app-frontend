import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  customers: [],
  selectedCustomer: null,
  history: [],
  loading: false,
  error: null,
};

// Fetch all customers
export const fetchCustomers = createAsyncThunk(
  "customers/fetchCustomers",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("https://booking-app-backend-api.onrender.com/api/customers");
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to load customers"
      );
    }
  }
);

// Fetch single customer (with booking history)
export const fetchCustomerById = createAsyncThunk(
  "customers/fetchCustomerById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`https://booking-app-backend-api.onrender.com/api/customers/${id}`);
      return res.data; // { customer, history }
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to load customer"
      );
    }
  }
);

const customerSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    clearCustomerError(state) {
      state.error = null;
    },
    clearSelectedCustomer(state) {
      state.selectedCustomer = null;
      state.history = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // --- fetchCustomers
      .addCase(fetchCustomers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.loading = false;
        state.customers = action.payload;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // --- fetchCustomerById
      .addCase(fetchCustomerById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCustomerById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCustomer = action.payload.customer;
        state.history = action.payload.history;
      })
      .addCase(fetchCustomerById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCustomerError, clearSelectedCustomer } = customerSlice.actions;
export default customerSlice.reducer;
