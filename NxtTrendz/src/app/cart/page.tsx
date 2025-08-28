"use client";
import React, { useEffect, useState } from "react";
import CartItemCard from "./CartItemCard";
import { useAppContext } from "../context/AppContext";

type Img = {
  url: string;
};

type ProductDetails = {
  image: Img;
  title: string;
  brand: string;
  price: number;
  _id: string;
};

export type Items = {
  _id: string;
  productCount: number;
  productDetails: ProductDetails;
};

const CartPage = () => {
  const { user } = useAppContext();
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

  const handleQuantityChange = (
    product: string,
    action: "increase" | "decrease" | "remove"
  ) => {
    setCartItems((prev) => {
      if (action === "remove") {
        return prev.filter((item) => item.productDetails._id !== product);
      }

      return prev.map((item) => {
        if (item.productDetails._id === product) {
          if (action === "increase") {
            return { ...item, productCount: item.productCount + 1 };
          }
          if (action === "decrease" && item.productCount > 1) {
            return { ...item, productCount: item.productCount - 1 };
          }
        }
        return item;
      });
    });
  };

  const handleRemoveAllCart = async () => {
    const res = await fetch("/api/auth/cart", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user?.id }),
    });
    if (res.ok) {
      setCartItems([]);
      setTotalAmount(0);
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
  return cartItems.length !== 0 ? (
    <div className="max-w-[90%] xl:max-w-[80%] mx-auto mt-25">
      <h1 className="text-2xl md:text-4xl font-semibold">My Cart</h1>
      <h3
        onClick={handleRemoveAllCart}
        className="text-blue-600 cursor-pointer text-2xl font-bold mb-8 flex justify-end items-center"
      >
        Remove All
      </h3>
      <div className="grid grid-cols-1 gap-8">
        {cartItems.map((item) => (
          <CartItemCard
            item={item}
            key={item._id}
            onQuantityChange={handleQuantityChange}
          />
        ))}
      </div>
      <div className="text-right mt-6">
        <p className="text-xl font-bold">Total: Rs {totalAmount}/-</p>
      </div>
    </div>
  ) : (
    <div className="mt-29 text-center text-4xl font-semibold">
      Cart is Empty
    </div>
  );
};

export default CartPage;
