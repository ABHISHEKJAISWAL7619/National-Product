import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/auth-slice";
import sessionReducer from "./slice/session-slice";
import { injectStore } from "@/utils/axiosInstance";
import mainCategorySlice from "@/redux/slice/main-category";
import subcategory from "@/redux/slice/SubCategory";
import ItemSlice from "@/redux/slice/Item-slice";
import incomingSlice from "@/redux/slice/incoming-slice";
import batchSlice from "@/redux/slice/batch-slice";
import compositionSlice from "@/redux/slice/composition-slice";
import productionSlice from "@/redux/slice/production-slice";
import production2Slice from "@/redux/slice/production2-slice";
import inventorySlice from "./slice/inventory-slice";
import dashboardSlice from "./slice/dashboard-slice";
import customerSlice from "./slice/customer-slice";
import roleSlice from "./slice/role-slice";
import memberSlice from "./slice/member-slice";
import dispatchSlice from "./slice/dispatch-slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    session: sessionReducer,
    category: mainCategorySlice,
    subcategory: subcategory,
    item: ItemSlice,
    incoming: incomingSlice,
    batch: batchSlice,
    composition: compositionSlice,
    production: productionSlice,
    production2: production2Slice,
    inventory: inventorySlice,
    dashboard: dashboardSlice,
    customer: customerSlice,
    role: roleSlice,
    member: memberSlice,
    dispatch: dispatchSlice,
  },
});

injectStore(store);
