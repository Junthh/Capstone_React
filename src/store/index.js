// src/store/index.js
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../store/auth.slice";
import ticketBookingSlice from "../store/ticketBooking.slice";

export const store = configureStore({
    reducer: {
        authSlice,
        ticketBookingSlice,
    },
});