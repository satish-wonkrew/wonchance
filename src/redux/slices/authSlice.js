import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    user: null,
  },
  reducers: {
    // Set loading state
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    // Set user state
    setUser: (state, action) => {
      state.user = action.payload;
      state.loading = false; // reset loading when user is set
    },
    // Logout user and reset state
    logoutUser: (state) => {
      state.user = null;
      state.loading = false;
    },
  },
});

export const { setLoading, setUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
