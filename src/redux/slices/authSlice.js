// redux/slices/authSlice.js - WITH ENCRYPTION

import { createSlice } from "@reduxjs/toolkit";
import { encryptData, decryptData } from "../../utils/encryption";

// ✅ Helper functions
const getStoredToken = () => {
  const encryptedToken = localStorage.getItem("_at");
  return encryptedToken ? decryptData(encryptedToken) : null;
};

const getStoredUser = () => {
  const userData = localStorage.getItem("user");
  return userData ? JSON.parse(userData) : null;
};

const initialState = {
  user: getStoredUser(),
  token: getStoredToken(),
  isAuthenticated: !!getStoredToken(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;

      // ✅ Store user as normal
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      
      // ✅ Store token as encrypted (name changed to _at)
      localStorage.setItem("_at", encryptData(action.payload.token));
    },

    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;

      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("_at", encryptData(action.payload.token));
    },

    updateUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;

      localStorage.removeItem("user");
      localStorage.removeItem("_at");
    },
  },
});

export const { loginSuccess, setCredentials, updateUser, logout } = authSlice.actions;
export default authSlice.reducer;