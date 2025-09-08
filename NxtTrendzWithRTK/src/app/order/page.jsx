"use client";

import { useEffect, useState } from "react";
import OrderDetails from "./OrderDetails";
import { useGetAllOrdersMutation } from "@/features/orderApiSlice";
import Loading from "../loading";

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
    console.log(data);

    if (data.success) {
      // const { orders } = await res.json();
      setMyOrders(data.orders);
    }
  };

  useEffect(() => {
    handleGetAllOrders();
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <div className="mt-16">
      <h1 className="p-6 text-2xl font-semibold">My Orders</h1>
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
