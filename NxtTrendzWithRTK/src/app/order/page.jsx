"use client";

import { useEffect, useState } from "react";
import OrderDetails from "./OrderDetails";

const OrdersPage = () => {
  const [myOrders, setMyOrders] = useState([]);

  const getAllOrders = async () => {
    const res = await fetch("/api/user/orders", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      const { orders } = await res.json();
      setMyOrders(orders);
    }
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <div className="mt-25">
      <h1>My Orders</h1>
      <div className="flex flex-col gap-15">
        {myOrders?.map((order) => (
          <div key={order._id}>
            <OrderDetails orderDetails={order} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
