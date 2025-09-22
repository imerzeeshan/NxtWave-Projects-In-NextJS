"use client";
import Orders from "@/app/admin/orders/page";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const SellerOrders = () => {
  const { user } = useSelector((state) => state.auth);

  console.log(user);

  const getOrders = async () => {
    const res = await fetch("/api/seller/orders", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    const { myProductOrders, success } = data;
    console.log(myProductOrders);

    if (success) {
      myProductOrders.forEach((order) => {
        order.items.forEach((item) => {
          console.log(item.seller === user.id);
        });
      });
    }
  };

  useEffect(() => {
    getOrders();
  }, []);
  return (
    <div className="mt-16">
      <Orders />
    </div>
  );
};

export default SellerOrders;
