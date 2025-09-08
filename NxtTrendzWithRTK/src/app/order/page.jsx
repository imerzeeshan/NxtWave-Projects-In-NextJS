"use client";

import { useEffect, useState } from "react";
import OrderDetails from "./OrderDetails";
import { useGetAllOrdersMutation } from "@/features/orderApiSlice";

const OrdersPage = () => {
  const [myOrders, setMyOrders] = useState([]);

  const [getAllOrders, { isLoading, isError, error, isSuccess, data }] =
    useGetAllOrdersMutation();

  const handleGetAllOrders = async () => {
    // const res = await fetch("/api/user/orders", {
    //   method: "GET",
    //   headers: { "Content-Type": "application/json" },
    // });
    const { data } = await getAllOrders();
    if (data.success) {
      // const { orders } = await res.json();
      setMyOrders(data.orders);
    }
  };

  useEffect(() => {
    handleGetAllOrders();
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
