import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApiSlice = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    getAllOrders: builder.mutation({
      query: () => ({
        url: "user/orders",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllOrdersMutation } = orderApiSlice;
