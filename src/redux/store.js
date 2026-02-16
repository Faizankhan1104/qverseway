import { configureStore } from "@reduxjs/toolkit";
import courseReducer from "./slices/courseSlice";
import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    course: courseReducer,
    auth: authReducer,
  },
});
