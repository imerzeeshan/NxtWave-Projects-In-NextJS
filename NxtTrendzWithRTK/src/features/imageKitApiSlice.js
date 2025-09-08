import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const imageKitApiSlice = createApi({
  reducerPath: "imageKitApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    deleteImageKitImage: builder.mutation({
      query: (credentials) => ({
        url: "auth/imagekit-auth",
        method: "DELETE",
        body: credentials,
      }),
    }),
  }),
});

export const { useDeleteImageKitImageMutation } = imageKitApiSlice;
