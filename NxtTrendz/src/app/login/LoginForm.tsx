"use client";

import SubmitButton from "./SubmitButton";
import { useAppContext } from "../context/AppContext";

export default function LoginForm() {
  const { router, loading, refreshSession } = useAppContext();

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      console.log(result);
      if (res.ok) {
        refreshSession();
        router.push("/");
      }
    } catch (error) {
      console.error(error);
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

        <SubmitButton isLoading={loading} />
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
        You don&apos;t have an account?{" "}
        <a href="/register" className="text-blue-600 hover:underline">
          Register
        </a>
      </p>
    </div>
  );
}
