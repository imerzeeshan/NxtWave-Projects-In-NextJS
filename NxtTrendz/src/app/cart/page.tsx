"use client";
import { X } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type Img = {
  url: string;
};

type ProductDetails = {
  image: Img;
  title: string;
  brand: string;
  price: number;
};

type Items = {
  _id: string;
  productCount: number;
  productDetails: ProductDetails;
};

const CartPage = () => {
  const [cartItems, setCartItems] = useState<Items[] | []>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  console.log(totalAmount);

  const getAllCartItems = async () => {
    try {
      const res = await fetch("/api/auth/cart");

      if (res.ok) {
        const data = await res.json();
        console.log(data.products);
        setCartItems(data.products);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const total = cartItems.reduce(
      (sum, item) => sum + item.productDetails.price * item.productCount,
      0
    );
    setTotalAmount(total);
  }, [cartItems]);

  useEffect(() => {
    getAllCartItems();
  }, []);
  return (
    <div className="max-w-[90%] xl:max-w-[80%] mx-auto mt-25">
      <h1 className="text-2xl md:text-4xl mb-8 font-semibold">My Cart</h1>
      <div className="flex flex-col gap-8">
        {cartItems.map((item) => (
          <div
            key={item._id}
            className="flex items-center justify-between gap-5 shadow-[-1px_1px_10px_rgba(0,0,0,0.2)]
            py-4 px-8 bg-white rounded-lg"
          >
            <div className="flex gap-5">
              <Image
                src={item?.productDetails.image.url}
                width={100}
                height={100}
                alt="product image"
                className="rounded"
                priority
              />
              <div className="flex flex-col justify-center">
                <h2 className="text-[#171f46] text-[16px] font-semibold">
                  {item?.productDetails.title}
                </h2>
                <p className="text-[#64748b] text-[12px]">
                  by {item?.productDetails.brand}
                </p>
              </div>
            </div>
            <div className="flex gap-15">
              <p className="text-[#0b69ff] text-[16px] md:text-xl font-bold">
                Rs {item?.productDetails.price * item.productCount}/-
              </p>
              <X className="bg-gray-500 rounded-full text-white p-0.5 cursor-pointer" size={25} />
            </div>
          </div>
        ))}
      </div>
      <div className="text-right mt-6">
        <p className="text-xl font-bold">Total: Rs {totalAmount}/-</p>
      </div>
    </div>
  );
};

export default CartPage;
