"use client";

import axiosInstance from "@/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const BASE_URL = "/api/admin/order";

export const fetchdispatchitems = createAsyncThunk(
  "dispatch/fetchdispatchs",
  async ({ filters = {} } = {}, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/api/admin/sale", {
        params: filters,
      });

      return {
        data: data?.data || [],
        count: data?.pagination?.count || 0,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch dispatchs"
      );
    }
  }
);

export const fetchalldispatch = createAsyncThunk(
  "dispatch/getall",
  async ({ filters = {} } = {}, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/api/admin/order", {
        params: filters,
      });

      return {
        data: data?.data || [],
        count: data?.count || 0,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch dispatchs"
      );
    }
  }
);

/* ===========================================================
   2) Fetch Single dispatch  (GET /api/admin/dispatch/:id)
=========================================================== */
export const fetchSingledispatch = createAsyncThunk(
  "dispatch/fetchSingledispatch",
  async ({ dispatchId }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`${BASE_URL}/${dispatchId}`);
      return data?.data || {};
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch dispatch details"
      );
    }
  }
);

export const createOrUpdatedispatch = createAsyncThunk(
  "dispatch/createOrUpdatedispatch",
  async ({ dispatchData, dispatchId }, { rejectWithValue }) => {
    try {
      const url = dispatchId ? `${BASE_URL}/${dispatchId}` : BASE_URL;
      const method = dispatchId ? "PUT" : "POST";

      const { data } = await axiosInstance({
        method,
        url,
        data: dispatchData,
      });

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data.message || "Failed to create/update dispatch"
      );
    }
  }
);

export const deletedispatch = createAsyncThunk(
  "dispatch/deletedispatch",
  async ({ dispatchId }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.delete(`${BASE_URL}/${dispatchId}`);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to delete dispatch"
      );
    }
  }
);

const initialState = {
  loading: false,
  error: null,
  documentCount: 0,
  dispatchList: [],
  singledispatch: {},
  Allitems: [],
};

const dispatchSlice = createSlice({
  name: "dispatch",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchdispatchitems.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchdispatchitems.fulfilled, (state, action) => {
        state.loading = false;
        state.dispatchList = action.payload.data; // actual list
        state.documentCount = action.payload.count; // pagination count
      })

      .addCase(fetchdispatchitems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchalldispatch.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchalldispatch.fulfilled, (state, action) => {
        state.loading = false;
        state.dispatchList = action.payload.data; // <-- FIXED
        state.documentCount = action.payload.count; // <-- FIXED
      })

      .addCase(fetchalldispatch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchSingledispatch.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSingledispatch.fulfilled, (state, action) => {
        state.loading = false;
        state.singledispatch = action.payload;
      })
      .addCase(fetchSingledispatch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createOrUpdatedispatch.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrUpdatedispatch.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createOrUpdatedispatch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deletedispatch.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletedispatch.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deletedispatch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default dispatchSlice.reducer;
