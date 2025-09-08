import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const profileApiSlice = createApi({
  reducerPath: "prifileApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    updateProfile: builder.mutation({
      query: (credentials) => ({
        url: "user/profile",
        method: "PATCH",
        body: credentials,
      }),
    }),
  }),
});

export const { useUpdateProfileMutation } = profileApiSlice;
