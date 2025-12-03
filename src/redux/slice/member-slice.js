"use client";

import axiosInstance from "@/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const BASE_URL = "/api/admin/getallUsers";

export const fetchmembers = createAsyncThunk(
  "member/fetchmembers",
  async ({ filters = {} } = {}, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(BASE_URL, {
        params: filters,
      });
      return data?.data || [];
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch members");
    }
  }
);

export const fetchSinglemember = createAsyncThunk(
  "member/fetchSinglemember",
  async ({ memberId }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`${BASE_URL}/${memberId}`);
      return data?.data || {};
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch member details"
      );
    }
  }
);

export const createOrUpdatemember = createAsyncThunk(
  "member/createOrUpdatemember",
  async ({ memberData, memberId }, { rejectWithValue }) => {
    try {
      const url = memberId ? `${BASE_URL}/${memberId}` : BASE_URL;
      const method = memberId ? "PUT" : "POST";

      const { data } = await axiosInstance({
        method,
        url,
        data: memberData,
      });

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to create/update member"
      );
    }
  }
);

export const deletemember = createAsyncThunk(
  "member/deletemember",
  async ({ memberId }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.delete(`${BASE_URL}/${memberId}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to delete member");
    }
  }
);

const initialState = {
  loading: false,
  error: null,
  documentCount: 0,
  memberList: [],
  singlemember: {},
};

const memberSlice = createSlice({
  name: "member",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchmembers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchmembers.fulfilled, (state, action) => {
        state.loading = false;
        state.memberList = action.payload;
        state.documentCount = action.payload.length;
      })
      .addCase(fetchmembers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchSinglemember.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSinglemember.fulfilled, (state, action) => {
        state.loading = false;
        state.singlemember = action.payload;
      })
      .addCase(fetchSinglemember.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createOrUpdatemember.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrUpdatemember.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createOrUpdatemember.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deletemember.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletemember.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deletemember.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default memberSlice.reducer;
