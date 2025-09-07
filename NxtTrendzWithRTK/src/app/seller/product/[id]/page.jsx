"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Product } from "@/types/types";
import { Star } from "lucide-react";
import Link from "next/link";
import { useAppContext } from "@/app/context/AppContext";

const ProductDetailsPage = () => {
  const { user } = useAppContext();
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const [item, setItem] = useState(1);
  // console.log(id);

  const getProductDetails = async () => {
    const res = await fetch(`/api/auth/product/${id}`);

    if (res.ok) {
      const data = await res.json();
      // console.log(data.productDetails);
      setProductDetails(data.productDetails);
    }
  };

  const handleSetItemDecrease = async () => {
    if (item > 1) {
      setItem((prev) => prev - 1);
    }
  };

  const handleAddToCart = async () => {
    const res = await fetch("/api/auth/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId: productDetails?.product._id,
        title: productDetails?.product.title,
        brand: productDetails?.product.brand,
        productCount: item,
        userId: user?.id,
      }),
    });
    const data = await res.json();
    console.log(data);
  };

  useEffect(() => {
    getProductDetails();
  }, []);

  return (
    <div className="max-w-[90%] xl:max-w-[80%] mx-auto mt-30 pb-15">
      <div
        className="max-w-[90%] xl:max-w-[80%] mx-auto mt-30 grid grid-cols-1 md:grid-cols-2 gap-5
      md:gap-10 lg:gap-15 pb-15"
      >
        <Image
          src={productDetails?.product?.image?.url ?? "/images/placeholder.jpg"}
          height={600}
          width={500}
          alt="product Image"
          priority
          className="rounded-2xl h-full"
        />
        <div>
          <h1 className="text-[#3e4c59] text-2xl md:text-5xl font-semibold mb-2 md:mb-4">
            {productDetails?.product?.title}
          </h1>
          <p className="text-[#171f46] text-2xl font-bold mb-4">
            Rs {productDetails?.product?.price}/-
          </p>
          <div className="flex gap-10 items-center mb-4">
            <p
              className="flex items-center gap-2 text-[16px] font-semibold bg-blue-500 text-white 
          px-4 py-1 rounded"
            >
              {productDetails?.product?.rating} <Star fill="white" size={16} />
            </p>
            <p className="text-[#12022f]">
              {productDetails?.product?.totalReviews} Reviews
            </p>
          </div>
          <p className="text-[#616e7c] mb-5">
            {productDetails?.product?.description}
          </p>
          <p className="text-[#171f46] text-xl font-semibold">
            Available:
            <span className="text-[#616e7c] text-[16px] ml-3">
              {productDetails?.product?.availability}
            </span>
          </p>
          <p className="text-[#171f46] text-xl font-semibold">
            Brand:{" "}
            <span className="text-[#616e7c] text-[16px] ml-3">
              {productDetails?.product?.brand}
            </span>
          </p>
          <hr className="text-gray-400 w-full h-[1.5px] my-6 bg-gray-400" />
          <div className="flex gap-3 items-center">
            <button
              className="border-2 rounded px-2.5 flex items-center justify-center border-gray-500 cursor-pointer
            text-gray-500 font-bold text-xl"
              onClick={handleSetItemDecrease}
            >
              -
            </button>
            <span className="text-gray-500 font-bold text-2xl">{item}</span>
            <button
              className="border-2 rounded px-2 flex items-center justify-center border-gray-500 cursor-pointer
            text-gray-500 font-bold text-xl"
              onClick={() => setItem((prev) => prev + 1)}
            >
              +
            </button>
          </div>
          <button
            onClick={handleAddToCart}
            className="mt-5 bg-blue-500 rounded text-white font-semibold px-3 py-3 cursor-pointer"
          >
            ADD TO CART
          </button>
        </div>
      </div>
      <div>
        <h2 className="text-[#3e4c59] text-2xl md:text-3xl font-semibold mb-10">
          Similar Products
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {productDetails?.similarProducts.map((product) => (
            <Link href={`/product/${product._id}`} key={product._id}>
              <div className="w-full overflow-hidden mb-2">
                <Image
                  src={product.image.url || "/images/placeholder.jpg"}
                  alt="product image"
                  width={300}
                  height={300}
                  className="w-full hover:scale-105 transition-all duration-200 rounded"
                />
              </div>
              <p className="text-[#171f46] text-xl font-semibold">
                {product.title}
              </p>
              <p className="text-[#3e4c59]">by {product.brand}</p>
              <div className="flex justify-between">
                <p className="text-[#171f46] text-xl font-semibold">
                  Rs {product.price}/-
                </p>
                <p
                  className="flex items-center gap-2 text-[16px] font-semibold bg-blue-500 text-white 
                  px-2 py-1 rounded"
                >
                  {product?.rating} <Star fill="white" size={16} />
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
