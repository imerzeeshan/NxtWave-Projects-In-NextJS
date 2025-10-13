import Image from "next/image";
import Link from "next/link";
import React from "react";

const CartItems = ({ cartItems }) => {
  console.log(cartItems);
  //   const {productCount} = cartItems;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-white">
      {cartItems.map((item) => (
        <Link
          href={`/product/${item.productDetails._id}`}
          key={item._id}
          className="bg-lime-950 p-5 w-full flex gap-5"
        >
          <Image
            src={item.productDetails.image.url}
            width={100}
            height={100}
            alt="product image"
          />
          <div>
            <p>{item.productDetails.description}</p>
            <p>{item.productDetails.title}</p>
            <p>{item.productDetails.brand}</p>
            <p>{item.productDetails.price}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CartItems;
