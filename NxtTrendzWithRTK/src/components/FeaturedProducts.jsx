import Image from "next/image";
import Link from "next/link";

const products = [
  { id: 1, name: "Casual Shirt", price: 29.99, image: "/images/placeholder.jpg" },
  { id: 2, name: "Summer Dress", price: 39.99, image: "/images/placeholder.jpg" },
  { id: 3, name: "Denim Jacket", price: 59.99, image: "/images/placeholder.jpg" },
];

export default function FeaturedProducts() {
  return (
    <section className="max-w-[90%] md:max-w[85%] lg:max-w-[80%] mx-auto mt-16">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Featured Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-xl p-4 shadow hover:shadow-lg transition"
          >
            <Image
              src={product.image}
              alt={product.name}
              width={300}
              height={300}
              className="rounded-lg"
            />
            <h3 className="mt-3 font-medium text-gray-700">{product.name}</h3>
            <p className="text-blue-600 font-semibold">${product.price}</p>
            <Link
              href={`/product/${product.id}`}
              className="mt-2 block text-center py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              View
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
