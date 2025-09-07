"use client";

import { setCredentials } from "@/features/authSlice";
import { store } from "@/store/store";
import { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";

export function ReduxProviders({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
