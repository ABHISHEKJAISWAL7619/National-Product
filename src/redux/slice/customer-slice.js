import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";

export const savecustomer = createAsyncThunk(
  "customer/save",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = id
        ? await axiosInstance.put(`/api/admin/customer/${id}`, formData)
        : await axiosInstance.post(`/api/admin/customer`, formData);
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to save customer"
      );
    }
  }
);

export const fetchcustomer = createAsyncThunk(
  "customer/fetch",
  async ({ id, filters = {} } = {}, { rejectWithValue }) => {
    try {
      const url = id ? `/api/admin/customer/${id}` : `/api/admin/customer`;

      const { data } = await axiosInstance.get(url, {
        params: id ? {} : filters,
      });

      return { ...data, id };
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch customer(s)"
      );
    }
  }
);

export const deletecustomer = createAsyncThunk(
  "customer/delete",
  async ({ id }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.delete(`/api/admin/customer/${id}`);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to delete customer"
      );
    }
  }
);

const initialState = {
  customerList: [],
  singlecustomer: null,
  documentCount: 0,
  loading: false,
  dataLoading: true,
  error: null,
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    resetcustomerError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // === SAVE (CREATE / UPDATE) ===
      .addCase(savecustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(savecustomer.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(savecustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // === FETCH All/SINGLE ===//
      .addCase(fetchcustomer.pending, (state) => {
        state.dataLoading = true;
        state.error = null;
      })
      .addCase(fetchcustomer.fulfilled, (state, action) => {
        const { data, totalRecords, id } = action.payload;
        state.dataLoading = false;

        if (id) {
          state.singlecustomer = Array.isArray(data)
            ? data.find((item) => item._id === id) || data[0]
            : data;
        } else {
          state.customerList = data;
          state.documentCount = totalRecords;
        }
      })

      .addCase(fetchcustomer.rejected, (state, action) => {
        state.dataLoading = false;
        state.error = action.payload;
      })

      //   === DELETE ===//
      .addCase(deletecustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletecustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.customerList = state.customerList.filter(
          (item) => item._id !== action.payload._id
        );
        state.documentCount -= 1;
      })
      .addCase(deletecustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetcustomerError } = customerSlice.actions;
export default customerSlice.reducer;
