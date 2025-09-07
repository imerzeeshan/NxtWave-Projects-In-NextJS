import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      className="min-h-[85vh] max-w-[90%] md:max-w[85%] lg:max-w-[80%] mt-20 flex flex-col md:flex-row 
      items-center justify-between gap-10 p-6 bg-white mx-auto"
    >
      <div className="flex flex-col gap-6 max-w-xl">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-800 leading-tight">
          Clothes That Get YOU Noticed
        </h1>
        <p className="text-gray-600 text-lg">
          Fashion is part of the daily air and it does not quite help that it
          changes all the time. Clothes have always been a marker of the era and
          we are in a revolution. Your fashion makes you been seen and heard
          that way you are. So, celebrate the seasons new and exciting fashion
          in your own way.
        </p>
        <Link
          href="/product"
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg w-fit"
        >
          Shop Now
        </Link>
      </div>
      <Image
        src="/images/home-img.png"
        alt="Fashion Banner"
        width={600}
        height={500}
        className="w-[400px] xl:w-[480px] h-auto"
        priority
      />
    </section>
  );
}
