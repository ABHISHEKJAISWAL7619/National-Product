import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";

export const saveproduction2 = createAsyncThunk(
  "production2/save",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = id
        ? await axiosInstance.put(`/api/admin/productionlevel/${id}`, formData)
        : await axiosInstance.post(`/api/admin/productionlevel`, formData);
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || "Failed to save production2"
      );
    }
  }
);

export const fetchproduction2 = createAsyncThunk(
  "production2/fetch",
  async ({ id, filters = {} } = {}, { rejectWithValue }) => {
    try {
      const url = id
        ? `/api/admin/productionlevel/${id}`
        : `/api/admin/productionlevel`;

      const { data } = await axiosInstance.get(url, {
        params: id ? {} : filters, // id ho → params empty, nahi ho → filters
      });

      return { ...data, id };
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch production2(s)"
      );
    }
  }
);

export const deleteproduction2 = createAsyncThunk(
  "production2/delete",
  async ({ id }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.delete(
        `/api/admin/productionlevel/${id}`
      );
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to delete production2"
      );
    }
  }
);

const initialState = {
  production2List: [],
  singleproduction2: null,
  documentCount: 0,
  loading: false,
  dataLoading: true,
  error: null,
};

const production2Slice = createSlice({
  name: "production2",
  initialState,
  reducers: {
    resetproduction2Error: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // === SAVE (CREATE / UPDATE) ===
      .addCase(saveproduction2.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveproduction2.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(saveproduction2.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // === FETCH All/SINGLE ===//
      .addCase(fetchproduction2.pending, (state) => {
        state.dataLoading = true;
        state.error = null;
      })
      .addCase(fetchproduction2.fulfilled, (state, action) => {
        const { data, count, id } = action.payload;
        state.dataLoading = false;

        if (id) {
          state.singleproduction2 = Array.isArray(data)
            ? data.find((item) => item._id === id) || data[0]
            : data;
        } else {
          state.production2List = data;
          state.documentCount = count;
        }
      })

      .addCase(fetchproduction2.rejected, (state, action) => {
        state.dataLoading = false;
        state.error = action.payload;
      })

      //   === DELETE ===//
      .addCase(deleteproduction2.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteproduction2.fulfilled, (state, action) => {
        state.loading = false;
        state.production2List = state.production2List.filter(
          (item) => item._id !== action.payload._id
        );
        state.documentCount -= 1;
      })
      .addCase(deleteproduction2.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetproduction2Error } = production2Slice.actions;
export default production2Slice.reducer;
