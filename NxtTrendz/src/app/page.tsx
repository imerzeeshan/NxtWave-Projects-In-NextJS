import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import FeaturedProducts from "@/components/FeaturedProducts";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";

export default function Home() {
  return (
    <main>
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
