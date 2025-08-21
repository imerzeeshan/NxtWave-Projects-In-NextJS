import Image from "next/image";
import RegisterForm from "./RegisterForm";

export default function RegisterPage() {
  return (
    <div
      className="min-h-screen relative flex flex-col lg:flex-row gap-6 items-center justify-center 
    bg-gray-100 px-4"
    >
      <Image
        src={"/images/loginImage.png"}
        width={600}
        height={500}
        alt="shopping Image"
        priority
        className="mt-30 lg:mt-0 w-[450px] h-full"
      />
      <RegisterForm />
    </div>
  );
}
