import { OrderItem } from "@/types/types";
import Image from "next/image";
import React from "react";

const OrderItemCard = ({ itemDetails }: { itemDetails: OrderItem }) => {
  const { product, quantity, subtotal } = itemDetails;
  return (
    <div className="bg-amber-300 p-5">
      <h1>Title: {product.title}</h1>
      <p>Brand: {product.brand}</p>
      <p>Price: {product.price}</p>
      <p>Quantity: {quantity}</p>
      <p>Subtotal: {subtotal}</p>
      <Image
        src={product.image.url}
        alt="product image"
        width={200}
        height={200}
        priority
      />
    </div>
  );
};

export default OrderItemCard;
