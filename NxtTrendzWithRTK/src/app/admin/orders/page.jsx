"use client";
import React, { useEffect } from "react";

const Orders = () => {
  const getOrders = async () => {
    const res = await fetch("/api/user/orders", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    console.log(data);
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
