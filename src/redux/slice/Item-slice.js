import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";
import CreateItem from "@/components/pages/Item-Master/CreateItem";

// === CREATE Sub CATEGORY ===
export const createItem = createAsyncThunk(
  "Item/createItem",
  async ({ itemData }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/api/admin/items", itemData);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create Sub category"
      );
    }
  }
);

// === FETCH ALL Sub CATEGORIES ===
export const fetchitems = createAsyncThunk(
  "Items/fetchitems",
  async ({ filters = {} }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/api/admin/items", {
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

export const getallitems = createAsyncThunk(
  "Items/allitems",
  async ({ filters = {} }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/api/admin/allitems", {
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
export const fetchItembyid = createAsyncThunk(
  "Otem/fetchItembyid",
  async ({ ItemId }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/api/admin/items/${ItemId}`);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch Sub categories"
      );
    }
  }
);

// === UPDATE Sub CATEGORY ===
export const updateItem = createAsyncThunk(
  "Item/updateItem",
  async ({ token, ItemId, ItemData }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put(
        `/api/admin/items/${ItemId}`,
        ItemData,
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
export const deleteItem = createAsyncThunk(
  "Item/deleteItem",
  async ({ token, ItemId }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.delete(
        `/api/admin/items/${ItemId}`,
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
  itemList: [],
  singleItem: null,
  documentCount: 0,
  loading: false,
  dataLoading: true,
  error: null,
};

// === SLICE ===
const ItemSlice = createSlice({
  name: "Item",
  initialState,
  reducers: {
    resetItemError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // CREATE
      .addCase(createItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createItem.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // FETCH
      .addCase(fetchitems.pending, (state) => {
        state.dataLoading = true;
        state.error = null;
      })
      .addCase(fetchitems.fulfilled, (state, action) => {
        const { data, count } = action.payload;
        state.dataLoading = false;
        state.itemList = data;
        state.documentCount = count;
      })
      .addCase(fetchitems.rejected, (state, action) => {
        state.dataLoading = false;
        state.error = action.payload;
      })

      // FETCH
      .addCase(getallitems.pending, (state) => {
        state.dataLoading = true;
        state.error = null;
      })
      .addCase(getallitems.fulfilled, (state, action) => {
        const { data, count } = action.payload;
        state.dataLoading = false;
        state.itemList = data;
        state.documentCount = count;
      })
      .addCase(getallitems.rejected, (state, action) => {
        state.dataLoading = false;
        state.error = action.payload;
      })

      .addCase(fetchItembyid.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.singleItem = null;
      })
      .addCase(fetchItembyid.fulfilled, (state, action) => {
        state.loading = false;
        state.singleItem = action.payload?.data || action.payload;
      })
      .addCase(fetchItembyid.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.singleItem = null;
      })

      // UPDATE
      .addCase(updateItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateItem.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DELETE
      .addCase(deleteItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.loading = false;
        state.ItemList = state.ItemList.filter(
          (item) => item._id !== action.payload._id
        );
        state.documentCount = state.documentCount - 1;
      })
      .addCase(deleteItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetItemError } = ItemSlice.actions;
export default ItemSlice.reducer;
