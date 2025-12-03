import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";

export const fetchstatcard = createAsyncThunk(
  "dashboard/save",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/admin/today-summary`);
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to save dashboard"
      );
    }
  }
);

export const fetchlowstock = createAsyncThunk(
  "dashboard/stock",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/admin/low-stock`);
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to save dashboard"
      );
    }
  }
);

export const weeklyproductiontrend = createAsyncThunk(
  "production/weekly",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/api/admin/weeklyproduction-trend`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to save dashboard"
      );
    }
  }
);
export const monthlystockmovement = createAsyncThunk(
  "production/monthly",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/api/admin/monthly-stock-movement`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to save dashboard"
      );
    }
  }
);
const initialState = {
  statcardList: [],
  trendList: [],
  monthlystockList: [],
  documentCount: 0,
  loading: false,
  dataLoading: true,
  error: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    resetdashboardError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchstatcard.pending, (state) => {
        state.dataLoading = true;
        state.error = null;
      })
      .addCase(fetchstatcard.fulfilled, (state, action) => {
        const { data, count, id } = action.payload;
        state.dataLoading = false;
        state.statcardList = data;
        state.documentCount = count;
      })
      .addCase(fetchstatcard.rejected, (state, action) => {
        state.dataLoading = false;
        state.error = action.payload;
      })
      .addCase(weeklyproductiontrend.pending, (state) => {
        state.dataLoading = true;
        state.error = null;
      })
      .addCase(weeklyproductiontrend.fulfilled, (state, action) => {
        const { data, count, id } = action.payload;
        state.dataLoading = false;
        state.trendList = data;
        state.documentCount = count;
      })
      .addCase(weeklyproductiontrend.rejected, (state, action) => {
        state.dataLoading = false;
        state.error = action.payload;
      })
      .addCase(monthlystockmovement.pending, (state) => {
        state.dataLoading = true;
        state.error = null;
      })
      .addCase(monthlystockmovement.fulfilled, (state, action) => {
        const { data, count, id } = action.payload;
        state.dataLoading = false;
        state.monthlystockList = data;
        state.documentCount = count;
      })
      .addCase(monthlystockmovement.rejected, (state, action) => {
        state.dataLoading = false;
        state.error = action.payload;
      });
  },
});

export const { resetdashboardError } = dashboardSlice.actions;
export default dashboardSlice.reducer;
