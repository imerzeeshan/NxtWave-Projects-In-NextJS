import Image from "next/image";

export default function Home() {
  return (
    <div
      className="min-h-screen md:max-w-[90%] mx-auto pt-30 md:flex items-center 
     bg-white gap-5 p-5"
    >
      <div className="flex flex-col items-center md:items-start gap-6">
        <h1 className="text-2xl text-black font-semibold text-center md:text-start">
          Clothes That Get YOU Noticed
        </h1>
        <Image
          src={"/images/home-img.png"}
          alt="banner imgae"
          width={500}
          height={500}
          className="w-[200px] h-full md:hidden"
        />
        <p className="text-xl text-gray-500 text-center md:text-start">
          Fashion is part of the daily air and it does not quite help that it
          changes all the time. Clothes have always been a marker of the era and
          we are in a revolution. Your fashion makes you been seen and heard
          that way you are. So, celebrate the seasons new and exciting fashion
          in your own way.
        </p>
        <button
          className="text-white px-4 md:px-8 py-2 md:py-3.5 bg-blue-500 hover:bg-blue-600 transition-all
       duration-300 rounded"
        >
          Shop Now
        </button>
      </div>
      <Image
        src={"/images/home-img.png"}
        alt="banner imgae"
        width={500}
        height={500}
        className="w-[400px] h-full hidden md:block ml-5"
      />
    </div>
  );
}
