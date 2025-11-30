import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axiosInstance";

export const fetchEmployeeDashboard = createAsyncThunk(
  "dashboard/fetchEmployeeDashboard",
  async () => {
    const res = await api.get("/dashboard/employee");
    return res.data;
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    loading: true,
    todayStatus: null,
    thisMonth: null,
    recentAttendance: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployeeDashboard.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEmployeeDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.todayStatus = action.payload.todayStatus;
        state.thisMonth = action.payload.thisMonth;
        state.recentAttendance = action.payload.recentAttendance;
      })
      .addCase(fetchEmployeeDashboard.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default dashboardSlice.reducer;
