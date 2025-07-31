import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  role: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  role: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<{ role: string }>) {
      state.isAuthenticated = true;
      state.role = action.payload.role;
      localStorage.setItem("userRole", action.payload.role);
    },
    logout(state) {
      state.isAuthenticated = false;
      state.role = null;
      localStorage.removeItem("userRole");
    },
    loadFromStorage(state) {
      const role = localStorage.getItem("userRole");
      if (role) {
        state.isAuthenticated = true;
        state.role = role;
      }
    },
  },
});

export const { loginSuccess, logout, loadFromStorage } = authSlice.actions;
export default authSlice.reducer;
