"use client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { AUTH_SIGNIN } from "@/constants/ApiRoutes";
import axiosInstance from "@/utils/axiosInstance";
import { successToast } from "@/utils/toastMessage";

const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL;

// Login
export const loginuser = createAsyncThunk(
  "auth/loginuser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${BACKEND_API_URL}${AUTH_SIGNIN}`, {
        email,
        password,
      });

      const token = data.token;
      Cookies.set("token", token, { expires: 6 });
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "user login failed");
    }
  }
);

// get logged in user details
export const fetchUserDetails = createAsyncThunk(
  "auth/fetchUserDetails",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/api/auth/user");
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "user login failed");
    }
  }
);

const token = Cookies.get("token");

const initialState = {
  user: {},
  token: token || null,
  loading: false,
  error: null,
  isAuthenticated: false,
  userLoading: true,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      Cookies.remove("token");
      successToast("user logout successfully");
      state.user = {};
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // login
      .addCase(loginuser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginuser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
        state.isAuthenticated = true;
      })
      .addCase(loginuser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || null;
      })

      // fetch details
      .addCase(fetchUserDetails.pending, (state) => {
        state.userLoading = true;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.userLoading = false;

        state.user = action.payload;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.userLoading = false;
        state.error = action.payload || null;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
