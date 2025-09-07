import Link from "next/link";

export default function CTA() {
  return (
    <section className="mt-20 bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg">
      <div className="max-w-4xl mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Upgrade Your Wardrobe Today
        </h2>
        <p className="text-lg md:text-xl mb-8 text-blue-100">
          Discover the latest trends and timeless classics. Don’t miss out on
          exclusive offers!
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/product"
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Shop Now
          </Link>
          <Link
            href="/signup"
            className="bg-transparent border-2 border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition"
          >
            Join Us
          </Link>
        </div>
      </div>
    </section>
  );
}
