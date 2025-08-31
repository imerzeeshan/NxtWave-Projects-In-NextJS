"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useAppContext } from "@/app/context/AppContext";

export default function Navbar() {
  const { loggedIn, refreshSession, router, user } = useAppContext();
  const [isScrolled, setIsScrolled] = useState(false);
  // const [loggedIn, setloggedIn] = useState(false); // replace with real auth
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const pathname = usePathname();

  const [underlineStyle, setUnderlineStyle] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const navRef = useRef<HTMLUListElement>(null);

  const handleLogout = async () => {
    const res = await fetch("/api/auth/logout", { method: "POST" });
    if (res.ok) {
      setMenuOpen(false);
      refreshSession();
      router.push("/login");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);

    setTimeout(() => setIsLoaded(true), 100);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🔹 Move underline on route change
  useEffect(() => {
    if (!navRef.current) return;
    const activeLink = navRef.current.querySelector<HTMLAnchorElement>(
      `a[href="${pathname}"]`
    );
    if (activeLink) {
      const rect = activeLink.getBoundingClientRect();
      const parentRect = navRef.current.getBoundingClientRect();
      setUnderlineStyle({
        left: rect.left - parentRect.left,
        width: rect.width,
        opacity: 1,
      });
    } else {
      setUnderlineStyle((prev) => ({ ...prev, opacity: 0 }));
    }
  }, [pathname]);

  const linkClasses = (path: string) =>
    `relative block py-1 transition-colors duration-300 
     ${
       pathname === path
         ? "text-blue-600 underline underline-offset-9"
         : "text-gray-700 hover:text-blue-600"
     }
     after:content-[''] after:absolute after:left-0 after:bottom-0
     after:h-[2px] after:w-0 after:bg-blue-600 after:transition-all after:duration-300
     hover:after:w-full`;

  return (
    <nav
      className={`w-full transition-all duration-500 bg-white fixed top-0 left-0 z-50 
        backdrop-blur-md shadow-md`}
    >
      <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold">
          <Link href={"/"}>
            <Image
              src={"/images/logo.png"}
              height={100}
              width={400}
              alt="logo"
              priority
              className="w-[140px] md:w-40 lg:w-50"
            />
          </Link>
        </div>
        {/* Desktop Menu */}
        <div className="relative hidden md:flex gap-10">
          <ul
            ref={navRef}
            className="flex items-center space-x-8 font-medium relative"
          >
            <li>
              <Link href="/" className={linkClasses("/")}>
                Home
              </Link>
            </li>
            {user?.role === "seller" && (
              <li>
                <Link href="/seller" className={linkClasses("/seller")}>
                  Dashboard
                </Link>
              </li>
            )}
            <li>
              <Link href="/product" className={linkClasses("/product")}>
                Products
              </Link>
            </li>
            <li>
              <Link href="/cart" className={linkClasses("/cart")}>
                Cart
              </Link>
            </li>
            {loggedIn && (
              <li>
                <Link href="/profile" className={linkClasses("/profile")}>
                  Profile
                </Link>
              </li>
            )}
          </ul>
          {!loggedIn ? (
            <div className="flex gap-5">
              <Link
                href="/login"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Register
              </Link>
            </div>
          ) : (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Logout
            </button>
          )}

          {/* 🔹 Sliding underline indicator for active route */}
          <span
            className="absolute bottom-1 h-[2px] bg-blue-600 transition-all duration-300"
            style={{
              left: underlineStyle.left,
              width: underlineStyle.width,
              opacity: underlineStyle.opacity,
            }}
          />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-gray-100"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Side Drawer */}
      <div
        className={`fixed top-0 right-0 min-h-screen w-64 bg-black/80 shadow-lg transform transition-transform 
            duration-300 ease-in-out md:hidden z-40 ${
              menuOpen ? "translate-x-0" : "translate-x-full"
            }`}
      >
        <div className="flex justify-between items-center p-4 border-b text-white">
          <span className="text-lg font-semibold">Menu</span>
          <button onClick={() => setMenuOpen(false)}>
            <X size={24} />
          </button>
        </div>
        <ul className="flex flex-col space-y-4 p-4 font-medium text-white">
          <li>
            <Link
              href="/"
              className={linkClasses("/")}
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/product"
              className={linkClasses("/product")}
              onClick={() => setMenuOpen(false)}
            >
              Product
            </Link>
          </li>
          <li>
            <Link
              href="/cart"
              className={linkClasses("/cart")}
              onClick={() => setMenuOpen(false)}
            >
              Cart
            </Link>
          </li>
          {!loggedIn ? (
            <>
              <li>
                <Link
                  href="/login"
                  className="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="block w-full text-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Register
                </Link>
              </li>
            </>
          ) : (
            <li>
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>

      {/* Background overlay */}
      <div
        className={`fixed h-screen inset-0 bg-black/40 md:hidden z-30 transition-opacity duration-300 ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setMenuOpen(false)}
      />
    </nav>
  );
}
