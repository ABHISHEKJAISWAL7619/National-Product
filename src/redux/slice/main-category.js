import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";

// === CREATE MAIN CATEGORY ===
export const createMainCategory = createAsyncThunk(
  "mainCategory/createMainCategory",
  async (categoryData, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(
        "/api/admin/category",
        categoryData
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create main category"
      );
    }
  }
);

// === FETCH ALL MAIN CATEGORIES ===
export const fetchMainCategories = createAsyncThunk(
  "mainCategory/fetchMainCategories",
  async ({ filters = {} }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/api/admin/category", {
        params: filters,
      });
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch main categories"
      );
    }
  }
);
// ===  FETCH CATEGORY BY ID ===
export const fetchMainCategorybyid = createAsyncThunk(
  "mainCategory/fetchMainCategories",
  async ({ categoryId }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(
        `/api/admin/category/${categoryId}`
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch main categories"
      );
    }
  }
);

// === UPDATE MAIN CATEGORY ===
export const updateMainCategory = createAsyncThunk(
  "mainCategory/updateMainCategory",
  async ({ token, categoryId, categoryData }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put(
        `/api/admin/category/${categoryId}`,
        categoryData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return data?.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update main category"
      );
    }
  }
);

// === DELETE MAIN CATEGORY ===
export const deleteMainCategory = createAsyncThunk(
  "mainCategory/deleteMainCategory",
  async ({ token, categoryId }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.delete(
        `/api/admin/category/${categoryId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return data?.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete main category"
      );
    }
  }
);

// === INITIAL STATE ===
const initialState = {
  categoryList: [],
  documentCount: 0,
  loading: false,
  dataLoading: true,
  error: null,
};

// === SLICE ===
const mainCategorySlice = createSlice({
  name: "mainCategory",
  initialState,
  reducers: {
    resetMainCategoryError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // CREATE
      .addCase(createMainCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createMainCategory.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createMainCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // FETCH
      .addCase(fetchMainCategories.pending, (state) => {
        state.dataLoading = true;
        state.error = null;
      })
      .addCase(fetchMainCategories.fulfilled, (state, action) => {
        const { data, count } = action.payload;
        state.dataLoading = false;
        state.categoryList = data;
        state.documentCount = count;
      })
      .addCase(fetchMainCategories.rejected, (state, action) => {
        state.dataLoading = false;
        state.error = action.payload;
      })

      // UPDATE
      .addCase(updateMainCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateMainCategory.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateMainCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DELETE
      .addCase(deleteMainCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMainCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categoryList = state.categoryList.filter(
          (item) => item._id !== action.payload._id
        );
        state.documentCount = state.documentCount - 1;
      })
      .addCase(deleteMainCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetMainCategoryError } = mainCategorySlice.actions;
export default mainCategorySlice.reducer;
