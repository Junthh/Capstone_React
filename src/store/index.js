import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../store/auth.slice"

export const store = configureStore({
    reducer: {
        authSlice,
    },
})