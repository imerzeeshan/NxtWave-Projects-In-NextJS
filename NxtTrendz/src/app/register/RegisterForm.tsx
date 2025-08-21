"use client";

import { useState } from "react";
import SubmitButton from "./SubmitButton";
import { useAppContext } from "../context/AppContext";

export default function RegisterForm() {
  const { router } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(event.currentTarget);

      //* Optional: turn it into a plain object if you want to inspect
      // const data = Object.fromEntries(formData.entries())
      // console.log("formData", data);

      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      if (res.ok) {
        console.log(result, "client");
        router.push("/login");
      } else {
        console.error(
          "Registration failed:",
          result.message || "Unknown error"
        );
        alert(result.message || "Registration failed");
      }
    } catch (error) {
      console.error("Something went wrong:", error);
      alert("Unexpected error, please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Create Account
      </h2>

      <form onSubmit={handleFormSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            required
            className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 
            focus:outline-none text-gray-700"
            placeholder="John Doe"
          />
        </div>

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

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            required
            className="w-full mt-1 px-4 text-gray-700 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500
             focus:outline-none"
            placeholder="••••••••"
          />
        </div>

        <SubmitButton isLoading={isLoading} />
      </form>

      {/* Messages */}
      {/* {state?.message && (
        <p
          className={`mt-4 text-center text-sm ${
            state?.success ? "text-green-600" : "text-red-600"
          }`}
        >
          {state?.message}
        </p>
      )} */}

      <p className="mt-4 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <a href="/login" className="text-blue-600 hover:underline">
          Login
        </a>
      </p>
    </div>
  );
}
