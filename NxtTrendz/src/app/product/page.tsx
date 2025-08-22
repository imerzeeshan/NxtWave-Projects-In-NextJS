"use client";
import { Star } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import FilterGroup from "./FilterGroup";
import ProductHeader from "./ProductHeader";

const ProductsPage = () => {
  const { filteredProducts } = useAppContext();
  return (
    <div className="max-w-[90%] xl:max-w-[80%] mx-auto mt-25 flex flex-col md:flex-row gap-5">
      <div className="flex-1">
        <FilterGroup products={filteredProducts} />
      </div>
      <div className="flex-3">
        <ProductHeader />
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-blue-50 rounded shadow w-full">
              <img
                src={product.image_url}
                alt="product Image"
                className="w-full rounded-t"
              />
              <div className="p-2">
                <h2 className="font-semibold text-gray-700">{product.title}</h2>
                <p className="text-sm text-gray-500">by {product.brand}</p>
                <div className="flex justify-between mt-2">
                  <p className="text-gray-800 font-medium">${product.price}</p>
                  <p className="bg-blue-600 text-white px-2 py-1 rounded flex items-center gap-2">
                    <Star size={20}/> {product.rating}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
