import React from "react";
import OrderItemCard from "./OrderItemCard";

const OrderDetails = ({ orderDetails }: { orderDetails: any }) => {
  return (
    <div>
      <div>
        <h2>Total Amount: {orderDetails.totalAmount}</h2>
        <p>Status: {orderDetails.status}</p>
        <div>
          {orderDetails.items.map((item: any) => (
            <OrderItemCard key={item._id} itemDetails={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
