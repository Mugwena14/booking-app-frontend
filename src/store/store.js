import { configureStore } from "@reduxjs/toolkit";
import servicesReducer from "./slices/servicesSlice";
import bookingsReducer from "./slices/bookingSlice";
import customersReducer from "./slices/customerSlice";
import availabilityReducer from "./slices/availabilitySlice";

const store = configureStore({
  reducer: {
    services: servicesReducer,
    booking: bookingsReducer,
    customers: customersReducer,
    availability: availabilityReducer,
  },
});

export default store;
