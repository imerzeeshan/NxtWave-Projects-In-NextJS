"use client";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const Orders = () => {
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
      <h1>Orders</h1>
    </div>
  );
};

export default Orders;
