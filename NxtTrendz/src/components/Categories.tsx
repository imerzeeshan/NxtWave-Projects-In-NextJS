import Image from "next/image";
import Link from "next/link";

const categories = [
  { name: "Men", image: "/images/men.png", href: "/category/men" },
  { name: "Women", image: "/images/women.png", href: "/category/women" },
  { name: "Kids", image: "/images/kids.png", href: "/category/kids" },
  {
    name: "Accessories",
    image: "/images/accessories.png",
    href: "/category/accessories",
  },
];

export default function Categories() {
  return (
    <section className="max-w-[90%] md:max-w[85%] lg:max-w-[80%] mx-auto mt-16">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Shop by Category
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <Link
            key={cat.name}
            href={cat.href}
            className="bg-gray-100 rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col items-center"
          >
            <Image
              src={cat.image}
              alt={cat.name}
              width={300}
              height={300}
              className="rounded-lg object-cover"
            />
            <h3 className="mt-2 font-semibold">{cat.name}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
}
