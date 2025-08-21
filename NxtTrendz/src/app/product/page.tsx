"use client";
import { useAppContext } from "../context/AppContext";
import ProductHeader from "./ProductHeader";

const ProductsPage = () => {
  const { products } = useAppContext();
  return (
    <div className="max-w-[90%] md:max-w[85%] lg:max-w-[80%] mx-auto mt-20">
      <ProductHeader />
      <div className="flex flex-wrap gap-5">
        {products.map((product) => (
          <div key={product.id}>
            <img src={product.image_url} alt="product Image" className="w-52" />
            <h2>{product.title}</h2>
            <p>by {product.brand}</p>
            <div className="flex justify-between">
              <p>{product.price}</p>
              <p>{product.rating}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
