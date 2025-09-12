// components/orders/OrdersPage.jsx
"use client";

import { useEffect, useState } from "react";
import OrderDetails from "./OrderDetails";
import { useGetAllOrdersMutation } from "@/features/orderApiSlice";
import Loading from "@/app/loading";


const OrdersPage = () => {
  const [myOrders, setMyOrders] = useState([]);

  const [getAllOrders, { isLoading }] = useGetAllOrdersMutation();

  const handleGetAllOrders = async () => {
    const { data } = await getAllOrders();
    if (data?.success) {
      setMyOrders(data.orders);
    }
  };

  useEffect(() => {
    handleGetAllOrders();
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div className="mt-16 max-w-6xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>
      <div className="space-y-8">
        {myOrders.length > 0 ? (
          myOrders.map((order) => (
            <OrderDetails key={order._id} orderDetails={order} />
          ))
        ) : (
          <p className="text-gray-400">You have no orders yet.</p>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
