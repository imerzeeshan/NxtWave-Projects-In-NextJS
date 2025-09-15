import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "@/features/apiSlice";
import authReducer from "@/features/authSlice";
import products from "@/features/productSlice";
import users from "@/features/userSlice";
import addresses from "@/features/addressSlice";
import { productApiSlice } from "@/features/productApiSlice";
import { cartApiSlice } from "@/features/cartApiSlice";
import { orderApiSlice } from "@/features/orderApiSlice";
import { imageKitApiSlice } from "@/features/imageKitApiSlice";
import { profileApiSlice } from "@/features/profileApiSlice";
import { userApiSlice } from "@/features/userApiSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    [productApiSlice.reducerPath]: productApiSlice.reducer,
    [cartApiSlice.reducerPath]: cartApiSlice.reducer,
    [orderApiSlice.reducerPath]: orderApiSlice.reducer,
    [imageKitApiSlice.reducerPath]: imageKitApiSlice.reducer,
    [profileApiSlice.reducerPath]: profileApiSlice.reducer,
    [userApiSlice.reducerPath]: userApiSlice.reducer,
    products: products,
    users: users,
    addresses: addresses,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      apiSlice.middleware,
      productApiSlice.middleware,
      cartApiSlice.middleware,
      orderApiSlice.middleware,
      imageKitApiSlice.middleware,
      profileApiSlice.middleware,
      userApiSlice.middleware
    ),
});
