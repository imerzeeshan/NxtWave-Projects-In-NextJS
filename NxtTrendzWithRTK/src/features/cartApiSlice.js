import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cartApiSlice = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    getAllCartItems: builder.mutation({
      query: () => ({
        url: "auth/cart",
        method: "GET",
      }),
    }),
    addToCartItem: builder.mutation({
      query: (credentials) => ({
        url: "auth/cart",
        method: "POST",
        body: credentials,
      }),
    }),
    updateCartItem: builder.mutation({
      query: (credentials) => ({
        url: "auth/cart",
        method: "PATCH",
        body: credentials,
      }),
    }),
    removeAllCartItems: builder.mutation({
      query: (credentials) => ({
        url: "auth/cart",
        method: "DELETE",
        body: credentials,
      }),
    }),
    increaseDecreaseCartItem: builder.mutation({
      query: (credentials) => ({
        url: "auth/cart",
        method: "PATCH",
        body: credentials,
      }),
    }),
  }),
});

export const {
  useGetAllCartItemsMutation,
  useAddToCartItemMutation,
  useUpdateCartItemMutation,
  useRemoveAllCartItemsMutation,
  useIncreaseDecreaseCartItemMutation
} = cartApiSlice;
