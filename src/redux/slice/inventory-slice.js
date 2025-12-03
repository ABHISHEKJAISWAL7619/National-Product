import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";

export const fetchinventorys = createAsyncThunk(
  "inventory/fetch",
  async ({ id, filters } = {}, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/api/admin/inventory`, {
        params: id ? { id } : filters || {},
      });
      return { ...data, id };
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch inventory(s)"
      );
    }
  }
);

export const fetchsingleinventory = createAsyncThunk(
  "inventory/single",
  async ({ id, filters } = {}, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(
        `/api/admin/inventory/ledger/${id}`,
        {
          params: id ? { id } : filters || {},
        }
      );
      return { ...data, id };
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch inventory(s)"
      );
    }
  }
);

const initialState = {
  inventoryList: [],
  documentCount: 0,
  loading: false,
  dataLoading: true,
  error: null,
};

const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    resetinventoryError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // === FETCH All/SINGLE ===//
      .addCase(fetchinventorys.pending, (state) => {
        state.dataLoading = true;
        state.error = null;
      })
      .addCase(fetchinventorys.fulfilled, (state, action) => {
        const { data, count, id } = action.payload;
        state.dataLoading = false;
        state.inventoryList = data;
        state.documentCount = count;
      })

      .addCase(fetchinventorys.rejected, (state, action) => {
        state.dataLoading = false;
        state.error = action.payload;
      });
  },
});

export const { resetinventoryError } = inventorySlice.actions;
export default inventorySlice.reducer;
