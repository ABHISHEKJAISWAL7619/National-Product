import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";

// === CREATE Sub CATEGORY ===
export const createcomposition = createAsyncThunk(
  "composition/createcomposition",
  async (compositionData, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(
        "/api/admin/with/composition",
        compositionData
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
export const fetchcompositions = createAsyncThunk(
  "compositions/fetchcompositions",
  async ({ filters = {} }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(
        "/api/admin/items/with/composition",
        {
          params: filters,
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch Sub categories"
      );
    }
  }
);

export const fetchsinglecompositions = createAsyncThunk(
  "compositions/fetchcompositions",
  async ({ filters = {}, id }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(
        `/api/admin/batch/composition/${id}`,
        {
          params: filters,
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch Sub categories"
      );
    }
  }
);
// ===  FETCH CATEGORY BY ID ===
export const fetchcompositionbyid = createAsyncThunk(
  "Otem/fetchcompositionbyid",
  async ({ compositionId }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(
        `/api/admin/with/composition/${compositionId}`
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
export const updatecomposition = createAsyncThunk(
  "composition/updatecomposition",
  async ({ token, compositionId, compositionData }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put(
        `/api/admin/with/composition/${compositionId}`,
        compositionData,
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
export const deletecomposition = createAsyncThunk(
  "composition/deletecomposition",
  async ({ token, compositionId }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.delete(
        `/api/admin/with/composition/${compositionId}`,
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
  compositionList: [],
  singlecomposition: null,
  documentCount: 0,
  loading: false,
  dataLoading: true,
  error: null,
};

// === SLICE ===
const compositionSlice = createSlice({
  name: "composition",
  initialState,
  reducers: {
    resetcompositionError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // CREATE
      .addCase(createcomposition.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createcomposition.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createcomposition.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // FETCH
      .addCase(fetchcompositions.pending, (state) => {
        state.dataLoading = true;
        state.error = null;
      })
      .addCase(fetchcompositions.fulfilled, (state, action) => {
        const { data, count } = action.payload;
        state.dataLoading = false;
        state.compositionList = data;
        state.documentCount = count;
      })
      .addCase(fetchcompositions.rejected, (state, action) => {
        state.dataLoading = false;
        state.error = action.payload;
      })

      .addCase(fetchcompositionbyid.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.singlecomposition = null;
      })
      .addCase(fetchcompositionbyid.fulfilled, (state, action) => {
        state.loading = false;
        state.singlecomposition = action.payload?.data || action.payload;
      })
      .addCase(fetchcompositionbyid.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.singlecomposition = null;
      })

      // UPDATE
      .addCase(updatecomposition.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatecomposition.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updatecomposition.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DELETE
      .addCase(deletecomposition.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletecomposition.fulfilled, (state, action) => {
        state.loading = false;
        state.compositionList = state.compositionList.filter(
          (composition) => composition._id !== action.payload._id
        );
        state.documentCount = state.documentCount - 1;
      })
      .addCase(deletecomposition.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetcompositionError } = compositionSlice.actions;
export default compositionSlice.reducer;
