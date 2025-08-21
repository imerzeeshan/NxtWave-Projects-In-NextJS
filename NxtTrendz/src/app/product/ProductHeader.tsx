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
  return (
    <div className="flex justify-between mb-7">
      <h1 className="text-3xl font-semibold text-gray-700/90">All Products</h1>
      <div className="flex gap-2 items-center text-gray-500">
        <AlignRight /> sort by
        <select name="" id="">
          <option value="">Price (High-Low)</option>
          <option value="">Price (Low-High)</option>
        </select>
      </div>
    </div>
  );
}
