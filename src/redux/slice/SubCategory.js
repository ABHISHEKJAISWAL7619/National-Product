import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";

// === CREATE Sub CATEGORY ===
export const createSubCategory = createAsyncThunk(
  "SubCategory/createSubCategory",
  async (SubcategoryData, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(
        "/api/admin/subCategory",
        SubcategoryData
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create Sub category"
      );
    }
  }
);

// === FETCH ALL Sub CATEGORIES ===
export const fetchSubCategories = createAsyncThunk(
  "SubCategory/fetchSubCategories",
  async ({ filters = {} }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/api/admin/subCategory", {
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
// ===  FETCH CATEGORY BY ID ===
export const fetchSubCategorybyid = createAsyncThunk(
  "SubCategory/fetchSubCategories",
  async ({ subcategoryId }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(
        `/api/admin/subCategory/${subcategoryId}`
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch Sub categories"
      );
    }
  }
);

// === UPDATE Sub CATEGORY ===
export const updateSubCategory = createAsyncThunk(
  "SubCategory/updateSubCategory",
  async ({ token, subcategoryId, subcategoryData }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put(
        `/api/admin/subCategory/${subcategoryId}`,
        subcategoryData,
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

// === DELETE Sub CATEGORY ===
export const deleteSubCategory = createAsyncThunk(
  "SubCategory/deleteSubCategory",
  async ({ token, subcategoryId }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.delete(
        `/api/admin/subCategory/${subcategoryId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return data?.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete Sub category"
      );
    }
  }
);

// === INITIAL STATE ===
const initialState = {
  SubcategoryList: [],
  documentCount: 0,
  loading: false,
  dataLoading: true,
  error: null,
};

// === SLICE ===
const subCategorySlice = createSlice({
  name: "SubCategory",
  initialState,
  reducers: {
    resetSubCategoryError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // CREATE
      .addCase(createSubCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSubCategory.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createSubCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // FETCH
      .addCase(fetchSubCategories.pending, (state) => {
        state.dataLoading = true;
        state.error = null;
      })
      .addCase(fetchSubCategories.fulfilled, (state, action) => {
        const { data, count } = action.payload;
        state.dataLoading = false;
        state.SubcategoryList = data;
        state.documentCount = count;
      })
      .addCase(fetchSubCategories.rejected, (state, action) => {
        state.dataLoading = false;
        state.error = action.payload;
      })

      // UPDATE
      .addCase(updateSubCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSubCategory.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateSubCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DELETE
      .addCase(deleteSubCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSubCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.SubcategoryList = state.SubcategoryList.filter(
          (item) => item._id !== action.payload._id
        );
        state.documentCount = state.documentCount - 1;
      })
      .addCase(deleteSubCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetSubCategoryError } = subCategorySlice.actions;
export default subCategorySlice.reducer;
