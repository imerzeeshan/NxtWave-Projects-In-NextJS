import { X } from "lucide-react";
import { Items } from "./page";
import Image from "next/image";
import CartItemCardButton from "./CartItemCardButton";
import { useAppContext } from "../context/AppContext";

const CartItemCard = ({
  item,
  onQuantityChange,
}: {
  item: Items;
  onQuantityChange: (
    product: string,
    action: "increase" | "decrease" | "remove"
  ) => void;
}) => {
  const { user } = useAppContext();

  const handleRemoveItem = async (
    action: "increase" | "decrease" | "remove"
  ) => {
    const res = await fetch("/api/auth/cart", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        product: item.productDetails._id,
        userId: user?._id,
        action,
      }),
    });
    const data = await res.json();
    console.log(data);
    if (res.ok) {
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
        userId={user?._id?.toString() || ""}
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

export default CartItemCard;
