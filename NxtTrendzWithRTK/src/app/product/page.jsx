"use client";
import { Star } from "lucide-react";
import FilterGroup from "./FilterGroup";
import ProductHeader from "./ProductHeader";
import { useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { setFilteredProducts, setProducts } from "@/features/productSlice";
import { useGetProductsApiMutation } from "@/features/productApiSlice";
import Loading from "../loading";

const ProductsPage = () => {
  const dispatch = useDispatch();
  const { filteredProducts } = useSelector((state) => state.products);
  // console.log(products);

  const [getProductsApi, { isLoading, isError, error, isSuccess, data }] =
    useGetProductsApiMutation();
  // console.log(isLoading, isError, error, isSuccess, data);

  const getAllProducts = async () => {
    const { data } = await getProductsApi();
    // console.log(data);

    if (data.success) {
      dispatch(setProducts(data.products));
      dispatch(setFilteredProducts(data.products));
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);
  return isLoading ? (
    <Loading />
  ) : (
    <div
      className="max-w-[90%] xl:max-w-[80%] mx-auto mt-25 grid grid-cols-1 md:grid-cols-[200px_1fr]
    lg:grid-cols-[200px_1fr] gap-5"
    >
      {/* Sidebar filter sticky */}
      <div className="md:sticky md:top-12 self-start z-10 ">
        <FilterGroup />
      </div>

      {/* Main content */}
      <div className="">
        {/* Header sticky */}
        <div className="md:sticky md:top-11 bg-white md:py-4 z-5 ">
          <ProductHeader />
        </div>

        {/* Product cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-4">
          {filteredProducts?.map((product) => (
            <Link
              href={`/product/${product._id}`}
              key={product._id}
              className="bg-blue-50 rounded shadow-xl w-full group"
            >
              <div className="overflow-hidden w-full">
                <img
                  src={product.image.url}
                  alt="product Image"
                  className="w-full rounded-t group-hover:scale-105 transition-all duration-300"
                />
              </div>
              <div className="p-2">
                <h2 className="font-semibold text-gray-700">{product.title}</h2>
                <p className="text-sm text-gray-500">by {product.brand}</p>
                <div className="flex justify-between mt-2">
                  <p className="text-gray-800 text-xl font-semibold ">
                    Rs {product.price}/-
                  </p>
                  <p className="bg-blue-600 text-white px-2 py-1 rounded flex items-center gap-2">
                    <Star size={20} /> {product.rating}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
