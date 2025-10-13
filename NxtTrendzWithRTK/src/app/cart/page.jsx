"use client";
import React, { useEffect, useState } from "react";
import CartItemCard from "./CartItemCard";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useGetAllCartItemsMutation } from "@/features/cartApiSlice";
import RemoveAllCartItemsButton from "./RevomeAllCartItemsButton";
import Loading from "../loading";
import Image from "next/image";
import Link from "next/link";

const CartPage = () => {
  const { user } = useSelector((state) => state.auth);
  // console.log(user);

  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  // console.log(totalAmount);

  const [getAllCartItems, { isLoading, isError, error, isSuccess, data }] =
    useGetAllCartItemsMutation();

  const handleGetAllCartItems = async () => {
    try {
      // const res = await fetch("/api/auth/cart");
      const { data } = await getAllCartItems();

      if (data.success) {
        setCartItems(data.products);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleQuantityChange = (product, action) => {
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

  const handleOrder = async () => {
    const res = await fetch("/api/user/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      console.log(await res.json());
      router.push("/order");
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
    handleGetAllCartItems();
  }, []);

  if (isLoading) return <Loading />;

  return cartItems.length !== 0 ? (
    <div className="max-w-[90%] xl:max-w-[80%] mx-auto mt-25">
      <h1 className="text-2xl md:text-4xl font-semibold">My Cart</h1>

      <RemoveAllCartItemsButton
        userId={user?.id}
        setCartItems={setCartItems}
        setTotalAmount={setTotalAmount}
      />

      <div className="grid grid-cols-1 gap-8">
        {cartItems.map((item) => (
          <CartItemCard
            item={item}
            user={user}
            key={item._id}
            onQuantityChange={handleQuantityChange}
          />
        ))}
      </div>
      <div className="text-right mt-6 space-y-5">
        <p className="text-xl font-bold">Total: Rs {totalAmount}/-</p>
        <Link
          href={"/checkout"}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white cursor-pointer my-5"
          // onClick={handleOrder}
        >
          Order Now
        </Link>
      </div>
    </div>
  ) : (
    <div className="h-screen flex flex-col justify-center items-center font-semibold gap-5">
      <Image
        src={"/images/empty-cart-img.png"}
        width={300}
        height={300}
        alt="empty cart image"
      />
      <h1 className="text-4xl text-blue-950"> Cart is Empty</h1>
      <Link
        href={"/product"}
        className="px-3.5 py-2 bg-blue-500 text-white cursor-pointer rounded hover:bg-blue-600"
      >
        Shop Now
      </Link>
    </div>
  );
};

export default CartPage;
