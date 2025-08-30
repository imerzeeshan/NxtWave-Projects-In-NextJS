import React from "react";

const OrderItemCard = ({ itemDetails }: { itemDetails: any }) => {
  return (
    <div>
      <h1>Title: {itemDetails.product.title}</h1>
    </div>
  );
};

export default OrderItemCard;
