import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApiSlice = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    getAllUsers: builder.mutation({
      query: () => ({
        url: "user/user-data",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllUsersMutation } = userApiSlice;
