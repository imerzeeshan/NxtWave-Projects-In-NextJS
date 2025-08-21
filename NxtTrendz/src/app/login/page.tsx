import Image from "next/image";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <div
      className="min-h-screen relative flex flex-col lg:flex-row gap-6 items-center justify-center 
    bg-gray-100 px-4"
    >
      <Image
        src={"/images/login-img.png"}
        width={600}
        height={500}
        alt="shopping Image"
        className="relative mt-30 lg:mt-0 w-[500px] h-full"
      />
      <LoginForm />
    </div>
  );
}
