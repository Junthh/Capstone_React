import { createSlice } from "@reduxjs/toolkit";

const userLocal = localStorage.getItem("user");
const initialState = { user: userLocal ? JSON.parse(userLocal) : null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    clearUser: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

export default authSlice.reducer;
export const { setUser, clearUser } = authSlice.actions;