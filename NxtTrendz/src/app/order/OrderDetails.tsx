import React from "react";
import OrderItemCard from "./OrderItemCard";
import { Order } from "@/types/types";

const OrderDetails = ({ orderDetails }: { orderDetails: Order }) => {
  return (
    <div className="bg-violet-300">
      <h2>Total Amount: {orderDetails.totalAmount}</h2>
      <p>Status: {orderDetails.status}</p>
      <div className="bg-red-200 flex gap-5">
        {orderDetails.items.map((item) => (
          <OrderItemCard key={item._id} itemDetails={item} />
        ))}
      </div>
    </div>
  );
};

export default OrderDetails;
