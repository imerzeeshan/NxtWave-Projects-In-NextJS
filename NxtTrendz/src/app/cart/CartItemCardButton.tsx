import { useAppContext } from "../context/AppContext";

const CartItemCardButton = ({
  count,
  product,
  userId,
  onQuantityChange,
}: {
  count: number;
  product: string;
  userId: string;
  onQuantityChange: (
    product: string,
    action: "increase" | "decrease"
  ) => void;
}) => {
  const { user } = useAppContext();
  //   console.log(productId, user);

  const handleIncrease = async (action: "increase" | "decrease") => {
    onQuantityChange(product, action);
    const res = await fetch("/api/auth/cart", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ product, userId, action }),
    });
    const data = await res.json();
    console.log(data);
  };

  return (
    <div className="flex gap-3 items-center justify-center">
      <button
        onClick={() => handleIncrease("decrease")}
        className="border-2 rounded px-2.5 flex items-center justify-center border-gray-500 cursor-pointer
            text-gray-500 font-bold text-xl"
      >
        -
      </button>
      <span className="text-gray-500 font-bold text-2xl">{count}</span>
      <button
        onClick={() => handleIncrease("increase")}
        className="border-2 rounded px-2 flex items-center justify-center border-gray-500 cursor-pointer
            text-gray-500 font-bold text-xl"
      >
        +
      </button>
    </div>
  );
};

export default CartItemCardButton;
