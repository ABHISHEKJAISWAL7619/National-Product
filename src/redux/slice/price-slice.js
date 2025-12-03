import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";

export const fetchprices = createAsyncThunk(
  "prices/fetchprices",
  async ({ formData }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(
        "/api/admin/item/price",
        formData
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch Sub categories"
      );
    }
  }
);

const initialState = {
  priceList: [],
  singleprice: null,
  documentCount: 0,
  loading: false,
  dataLoading: true,
  error: null,
};

const priceSlice = createSlice({
  name: "price",
  initialState,
  reducers: {
    resetpriceError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchprices.pending, (state) => {
        state.dataLoading = true;
        state.error = null;
      })
      .addCase(fetchprices.fulfilled, (state, action) => {
        const { data, count } = action.payload;
        state.dataLoading = false;
        state.priceList = data;
        state.documentCount = count;
      })
      .addCase(fetchprices.rejected, (state, action) => {
        state.dataLoading = false;
        state.error = action.payload;
      });
  },
});

export const { resetpriceError } = priceSlice.actions;
export default priceSlice.reducer;
