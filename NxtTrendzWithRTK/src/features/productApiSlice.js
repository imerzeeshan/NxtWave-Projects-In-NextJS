import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApiSlice = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    getProductsApi: builder.mutation({
      query: () => ({
        url: "auth/product",
        method: "GET",
      }),
    }),
    getProductDetailApi: builder.mutation({
      query: (id) => ({
        url: `auth/product/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetProductsApiMutation, useGetProductDetailApiMutation } =
  productApiSlice;
