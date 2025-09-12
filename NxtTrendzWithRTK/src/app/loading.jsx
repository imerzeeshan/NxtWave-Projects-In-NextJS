import Image from "next/image";
import loader from "../../public/images/loader.png"; // adjust path if needed

export default function Loading() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center h-64 z-50 bg-white absolute top-0 left-0">
      <Image
        src={loader}
        alt="Loading..."
        width={150}
        height={150}
        className="animate-spin"
      />
    </div>
  );
}
