"use client";

import axiosInstance from "@/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const BASE_URL = "/api/admin/role";

/* ===========================================================
   1) Fetch All Roles  (GET /api/admin/role?filter)
=========================================================== */
export const fetchRoles = createAsyncThunk(
  "role/fetchRoles",
  async ({ filter = {} } = {}, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(BASE_URL, {
        params: filter,
      });
      return data?.data || [];
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch roles");
    }
  }
);

/* ===========================================================
   2) Fetch Single Role  (GET /api/admin/role/:id)
=========================================================== */
export const fetchSingleRole = createAsyncThunk(
  "role/fetchSingleRole",
  async ({ roleId }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`${BASE_URL}/${roleId}`);
      return data?.data || {};
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch role details"
      );
    }
  }
);

/* ===========================================================
   3) Create Role  (POST /api/admin/role)
   4) Update Role (PUT  /api/admin/role/:id)
=========================================================== */
export const createOrUpdateRole = createAsyncThunk(
  "role/createOrUpdateRole",
  async ({ roleData, roleId }, { rejectWithValue }) => {
    try {
      const url = roleId ? `${BASE_URL}/${roleId}` : BASE_URL;
      const method = roleId ? "PUT" : "POST";

      const { data } = await axiosInstance({
        method,
        url,
        data: roleData,
      });

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to create/update role"
      );
    }
  }
);

/* ===========================================================
   5) Delete Role (DELETE /api/admin/role/:id)
=========================================================== */
export const deleteRole = createAsyncThunk(
  "role/deleteRole",
  async ({ roleId }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.delete(`${BASE_URL}/${roleId}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to delete role");
    }
  }
);

/* ===========================================================
   Initial State
=========================================================== */
const initialState = {
  loading: false,
  error: null,
  documentCount: 0,
  roleList: [],
  singleRole: {},
};

/* ===========================================================
   Slice
=========================================================== */
const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      /* ---------- Fetch Roles ---------- */
      .addCase(fetchRoles.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.loading = false;
        state.roleList = action.payload;
        state.documentCount = action.payload.length;
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------- Fetch Single Role ---------- */
      .addCase(fetchSingleRole.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSingleRole.fulfilled, (state, action) => {
        state.loading = false;
        state.singleRole = action.payload;
      })
      .addCase(fetchSingleRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------- Create / Update Role ---------- */
      .addCase(createOrUpdateRole.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrUpdateRole.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createOrUpdateRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------- Delete Role ---------- */
      .addCase(deleteRole.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteRole.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default roleSlice.reducer;
