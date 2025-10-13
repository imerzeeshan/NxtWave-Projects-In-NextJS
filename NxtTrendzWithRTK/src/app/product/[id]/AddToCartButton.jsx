import { useAddToCartItemMutation } from "@/features/cartApiSlice";
import { useRouter } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

const AddToCartButton = ({ productId }) => {
  const router = useRouter();
  const { user } = useSelector((state) => state.auth);
  const [addToCartItem, { isLoading, isError, error, isSuccess, data }] =
    useAddToCartItemMutation();
  console.log(isLoading);

  const handleAddToCart = async () => {
    const { data } = await addToCartItem({
      product: productId,
      userId: user?.id,
    });
    console.log(data);
    if (data.success) {
      router.push("/cart");
    }
  };
  return (
    <button
      onClick={handleAddToCart}
      disabled={isLoading}
      className="mt-5 bg-blue-500 rounded text-white font-semibold px-3 py-3 cursor-pointer
      disabled:cursor-not-allowed disabled:bg-gray-400"
    >
      ADD TO CART
    </button>
  );
};

export default AddToCartButton;
