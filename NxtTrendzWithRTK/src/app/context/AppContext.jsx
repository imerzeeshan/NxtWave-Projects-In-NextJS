"use client";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { ImageKitProvider } from "@imagekit/next";

const AppContext = createContext();

export function AppProvider({ children }) {
  const urlEndPoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(products);

  const fetchSession = async () => {
    setLoading(true);
    const res = await fetch("/api/auth/session", { credentials: "include" });
    const data = await res.json();

    try {
      if (data.loggedIn) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSession();
  }, []);

  return (
    <AppContext.Provider
      value={{
        router,
        user,
        loading,
        loggedIn: !!user,
        refreshSession: fetchSession,
        filteredProducts,
        setFilteredProducts,
        sortBy,
        setSortBy,
        products,
        setProducts,
      }}
    >
      <ImageKitProvider urlEndpoint={urlEndPoint}>{children}</ImageKitProvider>
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context)
    throw new Error("useAppContext must be used inside AppProvider");

  return context;
}
