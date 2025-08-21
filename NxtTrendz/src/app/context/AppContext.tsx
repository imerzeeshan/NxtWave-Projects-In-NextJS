"use client";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { products } from "../../../public/assets";
import { Product } from "../../types/types";

type User = {
  id: string;
  email: string;
  name: string;
};

type AppContextType = {
  router: ReturnType<typeof useRouter>;
  user: User | null;
  loggedIn: boolean;
  loading: boolean;
  refreshSession: () => Promise<void>; // function to manually refresh session
  products: Product[] | [];
};

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

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
        products,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context)
    throw new Error("useAppContext must be used inside AppProvider");

  return context;
}
