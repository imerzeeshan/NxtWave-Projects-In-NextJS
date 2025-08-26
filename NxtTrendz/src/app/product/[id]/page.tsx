"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Product } from "@/types/types";
import { Star } from "lucide-react";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [productDetailse, setProductDetails] = useState<Product | null>(null);
  // console.log(id);

  const getProductDetails = async () => {
    const res = await fetch(`/api/auth/product/${id}`);

    if (res.ok) {
      const data = await res.json();
      setProductDetails(data.product);
    }
  };

  useEffect(() => {
    getProductDetails();
  }, []);

  return (
    <div className="max-w-[90%] xl:max-w-[80%] mx-auto mt-30 grid grid-cols-1 md:grid-cols-2 gap-5 pb-15">
      <Image
        src={productDetailse?.image?.url ?? "/images/placeholder.jpg"}
        height={600}
        width={500}
        alt="product Image"
        priority
        className="rounded-2xl h-full"
      />
      <div>
        <h1 className="text-[#3e4c59] text-2xl md:text-5xl font-semibold mb-2 md:mb-4">
          {productDetailse?.title}
        </h1>
        <p className="text-[#171f46] text-2xl font-bold mb-4">
          Rs {productDetailse?.price}/-
        </p>
        <div className="flex gap-10 items-center mb-4">
          <p
            className="flex items-center gap-2 text-[16px] font-semibold bg-blue-500 text-white 
          px-4 py-1 rounded"
          >
            {productDetailse?.rating} <Star fill="white" size={16} />
          </p>
          <p className="text-[#12022f]">
            {productDetailse?.totalReviews} Reviews
          </p>
        </div>
        <p className="text-[#616e7c] mb-5">{productDetailse?.description}</p>
        <p className="text-[#171f46] text-xl font-semibold">
          Available:
          <span className="text-[#616e7c] text-[16px] ml-3">
            {productDetailse?.availability}
          </span>
        </p>
        <p className="text-[#171f46] text-xl font-semibold">
          Brand:{" "}
          <span className="text-[#616e7c] text-[16px] ml-3">
            {productDetailse?.brand}
          </span>
        </p>
        <hr className="text-gray-400 w-full h-[1.5px] my-5 bg-gray-400" />
      </div>
    </div>
  );
};

export default ProductDetailsPage;
