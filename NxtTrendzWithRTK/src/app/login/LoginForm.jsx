"use client";

import React from "react";
import { useRouter } from "next/navigation";
import SubmitButton from "./SubmitButton";
import { useLoginMutation } from "@/features/apiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/features/authSlice";

export default function LoginForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [login, { isLoading, isError, error, isSuccess, data }] =
    useLoginMutation();

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    const result = await login({ email, password });
    // console.log(result, "login result");

    if (result.data) {
      // console.log("User:", result);
      dispatch(setCredentials(result.data));
      router.push("/");
    }
  };

  return (
    <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Login Account
      </h2>

      <form onSubmit={handleFormSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            required
            className="w-full mt-1 px-4 text-gray-700 py-2 border rounded-lg focus:ring-2
             focus:ring-blue-500 focus:outline-none"
            placeholder="example@email.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            name="password"
            required
            className="w-full mt-1 px-4 text-gray-700 py-2 border rounded-lg focus:ring-2
             focus:ring-blue-500 focus:outline-none"
            placeholder="••••••••"
          />
        </div>

        <SubmitButton isLoading={isLoading} />
      </form>

      {isError && (
        <p className="mt-4 text-center text-red-600">{JSON.stringify(error)}</p>
      )}
      {isSuccess && (
        <p className="mt-4 text-center text-green-600">
          Login successful. Welcome {data?.user?.name}
        </p>
      )}

      <p className="mt-4 text-center text-sm text-gray-600">
        You don&apos;t have an account?{" "}
        <a href="/register" className="text-blue-600 hover:underline">
          Register
        </a>
      </p>
    </div>
  );
}
