import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth.slice";
import dashboardReducer from "./dashboard.slice"
import managerReducer from "./manager.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    manager: managerReducer,
  },
});
