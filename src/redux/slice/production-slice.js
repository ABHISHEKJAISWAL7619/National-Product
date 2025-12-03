import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";

export const saveProduction = createAsyncThunk(
  "production/save",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = id
        ? await axiosInstance.put(`/api/admin/production/${id}`, formData)
        : await axiosInstance.post(`/api/admin/production`, formData);
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to save production"
      );
    }
  }
);

export const fetchProductions = createAsyncThunk(
  "production/fetch",
  async ({ id, filters = {} } = {}, { rejectWithValue }) => {
    try {
      const url = id ? `/api/admin/production/${id}` : `/api/admin/production`;

      const { data } = await axiosInstance.get(url, {
        params: id ? {} : filters, // id ho -> empty params, nahi ho -> filters
      });

      return { ...data, id };
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch production(s)"
      );
    }
  }
);

export const fetchpendingproductions = createAsyncThunk(
  "pendingproduction/fetch",
  async ({ id, filters } = {}, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(
        id ? `/api/admin/work/progress/${id}` : `/api/admin/work/progress`,
        {
          params: id ? {} : filters || {},
        }
      );

      return { ...data, id };
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch production(s)"
      );
    }
  }
);

export const deleteProduction = createAsyncThunk(
  "production/delete",
  async ({ id }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.delete(
        `/api/admin/production/${id}`
      );
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to delete production"
      );
    }
  }
);

const initialState = {
  productionList: [],
  singleProduction: null,
  pendingproductList: [],
  documentCount: 0,
  loading: false,
  dataLoading: true,
  error: null,
};

const productionSlice = createSlice({
  name: "production",
  initialState,
  reducers: {
    resetProductionError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // === SAVE (CREATE / UPDATE) ===
      .addCase(saveProduction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveProduction.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(saveProduction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // === FETCH All/SINGLE ===//
      .addCase(fetchProductions.pending, (state) => {
        state.dataLoading = true;
        state.error = null;
      })
      .addCase(fetchProductions.fulfilled, (state, action) => {
        const { data, count, id } = action.payload;
        state.dataLoading = false;

        if (id) {
          state.singleProduction = Array.isArray(data)
            ? data.find((item) => item._id === id) || data[0]
            : data;
        } else {
          state.productionList = data;
          state.documentCount = count;
        }
      })

      .addCase(fetchProductions.rejected, (state, action) => {
        state.dataLoading = false;
        state.error = action.payload;
      })

      // === FETCH All ===//
      .addCase(fetchpendingproductions.pending, (state) => {
        state.dataLoading = true;
        state.error = null;
      })
      .addCase(fetchpendingproductions.fulfilled, (state, action) => {
        const { data, count } = action.payload;
        state.dataLoading = false;
        state.pendingproductList = data;
        state.documentCount = count;
      })
      .addCase(fetchpendingproductions.rejected, (state, action) => {
        state.dataLoading = false;
        state.error = action.payload;
      })

      //   === DELETE ===//
      .addCase(deleteProduction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduction.fulfilled, (state, action) => {
        state.loading = false;
        state.productionList = state.productionList.filter(
          (item) => item._id !== action.payload._id
        );
        state.documentCount -= 1;
      })
      .addCase(deleteProduction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetProductionError } = productionSlice.actions;
export default productionSlice.reducer;
