// components/orders/OrderItemCard.jsx
import Image from "next/image";
import React from "react";

const OrderItemCard = ({ itemDetails }) => {
  const { product, quantity, subtotal } = itemDetails;

  return (
    <div className="bg-gray-700 rounded-xl p-4 flex flex-col items-center shadow-sm">
      <Image
        src={product.image.url}
        alt={product.title}
        width={160}
        height={160}
        className="rounded-lg object-cover"
      />
      <div className="text-center mt-3 space-y-1">
        <h3 className="text-lg font-semibold">{product.title}</h3>
        <p className="text-sm text-gray-400">{product.brand}</p>
        <p className="text-sm">Price: ${product.price}</p>
        <p className="text-sm">Qty: {quantity}</p>
        <p className="font-medium text-amber-400">Subtotal: ${subtotal}</p>
      </div>
    </div>
  );
};

export default OrderItemCard;
