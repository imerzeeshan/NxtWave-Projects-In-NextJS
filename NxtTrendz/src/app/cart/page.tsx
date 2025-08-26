"use client";
import React, { useEffect } from "react";

const CartPage = () => {
  const getAllCartItems = async () => {
    const res = await fetch("/api/auth/cart");
    const data = await res.json();
    console.log(data);
  };
  useEffect(() => {
    getAllCartItems();
  }, []);
  return (
    <div className="mt-20">
      <h1>this is cart page</h1>
    </div>
  );
};

export default CartPage;
