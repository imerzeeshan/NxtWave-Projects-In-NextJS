import { useIncreaseDecreaseCartItemMutation } from "@/features/cartApiSlice";
import { memo } from "react";

const CartItemCardButton = ({ count, product, userId, onQuantityChange }) => {
  const [
    increaseDecreaseCartItem,
    { isLoading, isError, error, isSuccess, data },
  ] = useIncreaseDecreaseCartItemMutation();

  const handleIncreaseDecrease = async (action) => {
    onQuantityChange(product, action);
    // const res = await fetch("/api/auth/cart", {
    //   method: "PATCH",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ product, userId, action }),
    // });
    // const data = await res.json();
    const { data } = await increaseDecreaseCartItem({
      product,
      userId,
      action,
    });
    console.log(data);
  };

  return (
    <div className="flex gap-3 items-center justify-center">
      <button
        onClick={() => handleIncreaseDecrease("decrease")}
        className="border-2 rounded px-2.5 flex items-center justify-center border-gray-500 cursor-pointer
            text-gray-500 font-bold text-xl"
      >
        -
      </button>
      <span className="text-gray-500 font-bold text-2xl">{count}</span>
      <button
        onClick={() => handleIncreaseDecrease("increase")}
        className="border-2 rounded px-2 flex items-center justify-center border-gray-500 cursor-pointer
            text-gray-500 font-bold text-xl"
      >
        +
      </button>
    </div>
  );
};

export default memo(CartItemCardButton);
