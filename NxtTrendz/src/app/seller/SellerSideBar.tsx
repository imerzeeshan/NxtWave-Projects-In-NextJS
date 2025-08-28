"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const SellerSideBar = () => {
  const pathname = usePathname();
  console.log(pathname);

  const linkClasses = (path: string) =>
    `${
      path === pathname ? "bg-gray-100/20 font-semibold pl-4" : ""
    } hover:bg-gray-100/20 pl-2 py-2`;
  return (
    <div className="pt-25 bg-green-600 min-w-[200px] min-h-screen px-5 text-white">
      <nav className="flex flex-col gap-1 text-[18px]">
        <Link href={"/seller"} className={linkClasses("/seller")}>
          Dashboard
        </Link>
        <Link
          href={"/seller/product"}
          className={linkClasses("/seller/product")}
        >
          My Product
        </Link>
        <Link
          href={"/seller/add-product"}
          className={linkClasses("/seller/add-product")}
        >
          Add Product
        </Link>
        <Link href={"/seller/orders"} className={linkClasses("/seller/orders")}>
          Orders
        </Link>
        <Link
          href={"/seller/my-orders"}
          className={linkClasses("/seller/my-orders")}
        >
          My Orders
        </Link>
      </nav>
    </div>
  );
};

export default SellerSideBar;
