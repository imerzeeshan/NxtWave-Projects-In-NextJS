"use client";
import React, { useEffect, useState } from "react";
import CartItemCard from "./CartItemCard";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useGetAllCartItemsMutation } from "@/features/cartApiSlice";
import RemoveAllCartItemsButton from "./RevomeAllCartItemsButton";
import Loading from "../loading";

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
      <div className="text-right mt-6">
        <p className="text-xl font-bold">Total: Rs {totalAmount}/-</p>
        <button
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white cursor-pointer my-5 "
          onClick={handleOrder}
        >
          Order Now
        </button>
      </div>
    </div>
  ) : (
    <div className="mt-29 text-center text-4xl font-semibold">
      Cart is Empty
    </div>
  );
};

export default CartPage;
