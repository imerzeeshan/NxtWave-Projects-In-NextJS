"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const SellerSideBar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const linkClasses = (path) =>
    `${
      path === pathname ? "bg-gray-100/20 font-semibold pl-4" : ""
    } hover:bg-gray-100/20 pl-2 py-2 rounded-md`;

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed top-14 lg:top-16 left-0 h-full bg-green-600 text-white w-[230px] px-5 pt-10 transform 
          transition-transform duration-300 z-50 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0`}
      >
        {/* Sidebar header for mobile */}
        <div className="lg:hidden flex justify-between items-center mb-6">
          <h1 className="text-lg font-bold">Seller Panel</h1>
          <button onClick={() => setIsOpen(false)} className="p-2">
            <X size={24} />
          </button>
        </div>

        <nav className="flex flex-col gap-1 text-[18px]">
          <h1 className="text-xl font-bold mb-5">Seller Panel</h1>
          <Link href="/seller" className={linkClasses("/seller")}>
            Dashboard
          </Link>

          <Link
            href="/seller/product"
            className={linkClasses("/seller/product")}
          >
            My Product
          </Link>
          <Link
            href="/seller/add-product"
            className={linkClasses("/seller/add-product")}
          >
            Add Product
          </Link>
          <Link href="/seller/orders" className={linkClasses("/seller/orders")}>
            Orders
          </Link>
          <Link
            href="/seller/my-orders"
            className={linkClasses("/seller/my-orders")}
          >
            My Orders
          </Link>
        </nav>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 lg:hidden z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile top bar */}
      <div className="lg:hidden mt-14 bg-green-600 text-white p-4 relative pr-10">
        <button
          onClick={() => setIsOpen(true)}
          className="focus:outline-none fixed"
        >
          <Menu size={24} />
        </button>
      </div>
    </>
  );
};

export default SellerSideBar;
