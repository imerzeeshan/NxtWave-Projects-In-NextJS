"use client";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { Product } from "../../types/types";
import { ImageKitProvider } from "@imagekit/next";

type User = {
  id: string;
  email: string;
  name: string;
  role: string;
};

type SortBy = "PRICE_HIGH" | "PRICE_LOW" | null;

type AppContextType = {
  router: ReturnType<typeof useRouter>;
  user: User | null;
  loggedIn: boolean;
  loading: boolean;
  refreshSession: () => Promise<void>; // function to manually refresh session
  filteredProducts: Product[] | [];
  products: Product[] | [];
  setFilteredProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  sortBy: SortBy;
  setSortBy: (value: SortBy) => void;
};

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const urlEndPoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [sortBy, setSortBy] = useState<SortBy>(null);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[] | []>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[] | []>(
    products
  );

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
