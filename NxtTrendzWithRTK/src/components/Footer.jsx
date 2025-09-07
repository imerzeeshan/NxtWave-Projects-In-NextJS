import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center px-6">
        <p>
          &copy; {new Date().getFullYear()} MyFashionStore. All rights reserved.
        </p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/privacy">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
}
