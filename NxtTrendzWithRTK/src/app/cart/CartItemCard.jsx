import { X } from "lucide-react";
import Image from "next/image";
import CartItemCardButton from "./CartItemCardButton";
import { memo } from "react";
import { useUpdateCartItemMutation } from "@/features/cartApiSlice";

const CartItemCard = ({ item, onQuantityChange, user }) => {
  const [updateCartItem, { isLoading, isError, error, isSuccess, data }] =
    useUpdateCartItemMutation();

  const handleRemoveItem = async (action) => {
    const { data } = await updateCartItem({
      product: item.productDetails._id,
      userId: user?.id,
      action,
    });
    console.log(data);
    if (data.success) {
      onQuantityChange(item.productDetails._id, action);
    }
  };

  return (
    <div
      key={item._id}
      className="grid grid-cols-[1fr_150px_150px] lg:grid-cols-3 gap-5 shadow-[-1px_1px_10px_rgba(0,0,0,0.2)]
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
      <CartItemCardButton
        count={item.productCount}
        product={item.productDetails._id}
        userId={user?.id || ""}
        onQuantityChange={onQuantityChange}
      />
      <div className="flex items-center justify-end gap-5">
        <p className="text-[#0b69ff] text-[16px] md:text-xl font-bold">
          Rs {item?.productDetails.price * item.productCount}/-
        </p>
        <X
          onClick={() => handleRemoveItem("remove")}
          className="bg-gray-500 rounded-full text-white p-0.5 cursor-pointer"
          size={25}
        />
      </div>
    </div>
  );
};

export default memo(CartItemCard);
