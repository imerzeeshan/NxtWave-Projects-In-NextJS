import { useRemoveAllCartItemsMutation } from "@/features/cartApiSlice";
import React from "react";

const RevomeAllCartItemsButton = ({ userId, setCartItems, setTotalAmount }) => {
  const [removeAllCartItems, { isLoading, isError, error, isSuccess, data }] =
    useRemoveAllCartItemsMutation();

  const handleRemoveAllCart = async () => {
    const { data } = await removeAllCartItems({ userId });
    if (data.success) {
      setCartItems([]);
      setTotalAmount(0);
    }
  };

  return (
    <div className="flex justify-end items-center">
      <button
        onClick={handleRemoveAllCart}
        disabled={isLoading}
        className="text-blue-600 cursor-pointer text-2xl font-bold mb-8 disabled:cursor-not-allowed
        disabled:text-gray-500"
      >
        Remove All
      </button>
    </div>
  );
};

export default RevomeAllCartItemsButton;
