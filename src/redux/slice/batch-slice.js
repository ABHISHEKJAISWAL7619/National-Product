import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";

export const createbatch = createAsyncThunk(
  "batch/createbatch",
  async (batchData, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/api/admin/batch", batchData);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create Sub category"
      );
    }
  }
);

export const fetchbatchs = createAsyncThunk(
  "batchs/fetchbatchs",
  async ({ filters = {} }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/api/admin/batch", {
        params: filters,
      });
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch Sub categories"
      );
    }
  }
);
export const fetchbatchbyid = createAsyncThunk(
  "Otem/fetchbatchbyid",
  async ({ batchId }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/api/admin/batch/${batchId}`);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch Sub categories"
      );
    }
  }
);

export const updatebatch = createAsyncThunk(
  "batch/updatebatch",
  async ({ token, batchId, batchData }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put(
        `/api/admin/batch/${batchId}`,
        batchData,
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

export const deletebatch = createAsyncThunk(
  "batch/deletebatch",
  async ({ token, batchId }, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/api/admin/batch/${batchId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // ✅ return id manually
      return { _id: batchId };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete stock entry"
      );
    }
  }
);

const initialState = {
  batchList: [],
  singlebatch: null,
  documentCount: 0,
  loading: false,
  dataLoading: true,
  error: null,
};
const batchSlice = createSlice({
  name: "batch",
  initialState,
  reducers: {
    resetbatchError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createbatch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createbatch.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createbatch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchbatchs.pending, (state) => {
        state.dataLoading = true;
        state.error = null;
      })
      .addCase(fetchbatchs.fulfilled, (state, action) => {
        const { data, count } = action.payload;
        state.dataLoading = false;
        state.batchList = data;
        state.documentCount = count;
      })
      .addCase(fetchbatchs.rejected, (state, action) => {
        state.dataLoading = false;
        state.error = action.payload;
      })

      .addCase(fetchbatchbyid.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.singlebatch = null;
      })
      .addCase(fetchbatchbyid.fulfilled, (state, action) => {
        state.loading = false;
        state.singlebatch = action.payload?.data || action.payload;
      })
      .addCase(fetchbatchbyid.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.singlebatch = null;
      })

      .addCase(updatebatch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatebatch.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updatebatch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deletebatch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletebatch.fulfilled, (state, action) => {
        state.loading = false;
        state.batchList = state.batchList.filter(
          (batch) => batch._id !== action.payload._id
        );
        state.documentCount = state.documentCount - 1;
      })

      .addCase(deletebatch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetbatchError } = batchSlice.actions;
export default batchSlice.reducer;
