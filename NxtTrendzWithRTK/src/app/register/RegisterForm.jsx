"use client";

import SubmitButton from "./SubmitButton";
import { useRegisterMutation } from "@/features/apiSlice";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();

  const [register, { isLoading, isError, error, isSuccess, data }] =
    useRegisterMutation();

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);

      //* Optional: turn it into a plain object if you want to inspect
      const result = await register(formData).unwrap();
      console.log(result);

      if (result.success) {
        router.push("/login");
      } else {
        console.error(
          "Registration failed:",
          result.message || "Unknown error"
        );
        alert(result.message || "Registration failed");
      }
    } catch (error) {
      console.error("Something went wrong:", error.data.message);
      alert(error.data.message, ",please try again.");
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
