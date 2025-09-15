// "use client";

import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import FeaturedProducts from "@/components/FeaturedProducts";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";

export default function Home() {
//   useEffect(() => {
//     async function promise() {
//       await new Promise((resolve) => setTimeout(() => resolve(), 5000));
//     }
//     promise();
//   }, []);
  return (
    <main className="mt-30">
      <Hero />
      <Categories />
      <FeaturedProducts />
      <Testimonials />
      <CTA />
      <Newsletter />
      <Footer />
    </main>
  );
}
