import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";

export const createincoming = createAsyncThunk(
  "incoming/createincoming",
  async (incomingData, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(
        "/api/admin/incoming",
        incomingData
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create Sub category"
      );
    }
  }
);

export const fetchincomings = createAsyncThunk(
  "incomings/fetchincomings",
  async ({ filters = {} }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/api/admin/incoming", {
        params: filters,
      });
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch Sub categories"
      );
    }
  }
);
export const fetchincomingbyid = createAsyncThunk(
  "Otem/fetchincomingbyid",
  async ({ incomingId }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(
        `/api/admin/incoming/${incomingId}`
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch Sub categories"
      );
    }
  }
);

export const updateincoming = createAsyncThunk(
  "incoming/updateincoming",
  async ({ token, incomingId, incomingData }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put(
        `/api/admin/incoming/${incomingId}`,
        incomingData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return data?.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update Sub category"
      );
    }
  }
);

export const deleteincoming = createAsyncThunk(
  "incoming/deleteincoming",
  async ({ token, incomingId }, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/api/admin/incoming/${incomingId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // ✅ return id manually
      return { _id: incomingId };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete stock entry"
      );
    }
  }
);

const initialState = {
  incomingList: [],
  singleincoming: null,
  documentCount: 0,
  loading: false,
  dataLoading: true,
  error: null,
};

const incomingSlice = createSlice({
  name: "incoming",
  initialState,
  reducers: {
    resetincomingError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createincoming.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createincoming.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createincoming.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchincomings.pending, (state) => {
        state.dataLoading = true;
        state.error = null;
      })
      .addCase(fetchincomings.fulfilled, (state, action) => {
        const { data, count } = action.payload;
        state.dataLoading = false;
        state.incomingList = data;
        state.documentCount = count;
      })
      .addCase(fetchincomings.rejected, (state, action) => {
        state.dataLoading = false;
        state.error = action.payload;
      })

      .addCase(fetchincomingbyid.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.singleincoming = null;
      })
      .addCase(fetchincomingbyid.fulfilled, (state, action) => {
        state.loading = false;
        state.singleincoming = action.payload?.data || action.payload;
      })
      .addCase(fetchincomingbyid.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.singleincoming = null;
      })

      .addCase(updateincoming.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateincoming.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateincoming.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteincoming.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteincoming.fulfilled, (state, action) => {
        state.loading = false;
        state.incomingList = state.incomingList.filter(
          (incoming) => incoming._id !== action.payload._id
        );
        state.documentCount = state.documentCount - 1;
      })

      .addCase(deleteincoming.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetincomingError } = incomingSlice.actions;
export default incomingSlice.reducer;
