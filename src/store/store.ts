import { configureStore } from "@reduxjs/toolkit"
import auth from "../features/auth/authSlice"
import cart from "./cartSlice"
import categoryUI from "../features/admin/category/categorySlice"
import addonUI from "../features/admin/addon/addonSlice"
import menuUI from "../features/admin/menu/menuSlice"

// RTK Query APIs
import { addonApi } from "../features/admin/addon/addonApi"
import { categoryApi } from "../features/admin/category/categoryApi"
import { mediaApi } from "../features/admin/media/mediaApi"
import { menuApi } from "../features/admin/menu/menuApi"

export const store = configureStore({
  reducer: {
    auth,
    cart,
    categoryUI,
    addonUI,
    menuUI,
    // ✅ RTK Query reducers
    [addonApi.reducerPath]: addonApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [mediaApi.reducerPath]: mediaApi.reducer,
    [menuApi.reducerPath]: menuApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      addonApi.middleware,
      categoryApi.middleware,
      mediaApi.middleware,
      menuApi.middleware
    ),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
