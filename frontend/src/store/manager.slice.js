import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/api/axiosInstance";

// ==========================
// FETCH MANAGER DASHBOARD
// ==========================
export const fetchManagerDashboard = createAsyncThunk(
  "manager/fetchDashboard",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/dashboard/manager");
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || "Error loading dashboard");
    }
  }
);

const managerSlice = createSlice({
  name: "manager",
  initialState: {
    totalEmployees: null,
    todayStatus: null,
    weeklyTrend: [],
    departmentWise: {},
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchManagerDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchManagerDashboard.fulfilled, (state, action) => {
        state.loading = false;

        const {
          totalEmployees,
          todayStatus,
          weeklyTrend,
          departmentWise,
        } = action.payload;

        state.totalEmployees = totalEmployees;
        state.todayStatus = todayStatus;
        state.weeklyTrend = weeklyTrend;
        state.departmentWise = departmentWise;
      })
      .addCase(fetchManagerDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load dashboard";
      });
  },
});

export default managerSlice.reducer;
