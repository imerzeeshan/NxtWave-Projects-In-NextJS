import { useAppContext } from "@/app/context/AppContext";
import { AlignRight } from "lucide-react";

const sortbyOptions = [
  {
    optionId: "PRICE_HIGH",
    displayText: "Price (High-Low)",
  },
  {
    optionId: "PRICE_LOW",
    displayText: "Price (Low-High)",
  },
];

export default function ProductHeader() {
  const { sortBy, setSortBy } = useAppContext();
  return (
    <div className="grid grid-cols-[auto_235px] gap-2 mb-7 md:mb-0 md:pt-4">
      <h1 className="w-full md:text-center text-2xl md:font-semibold text-gray-700/90">
        All Products
      </h1>
      <div className="w-full flex gap-1 items-center text-gray-500">
        <div className="w-full flex gap-2 items-center">
          <AlignRight /> <span className="hidden md:block">sort by</span>
        </div>
        <select
          className="border p-1 rounded"
          value={sortBy || ""}
          onChange={(e) =>
            setSortBy(
              e.target.value
                ? (e.target.value as "PRICE_HIGH" | "PRICE_LOW")
                : null
            )
          }
        >
          <option value="">select</option>
          {sortbyOptions.map((option) => (
            <option value={option.optionId} key={option.optionId}>
              {option.displayText}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
