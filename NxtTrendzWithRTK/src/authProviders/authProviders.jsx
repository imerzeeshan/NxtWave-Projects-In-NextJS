"use client";
import { setCredentials } from "@/features/authSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();

  const getUserSession = async () => {
    try {
      const res = await fetch("/api/auth/session", {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        dispatch(setCredentials(data));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserSession();
  }, [dispatch]);

  return children;
};

export default AuthProvider;
