import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import CategoryGrid from "@/components/CategoryGrid";
import FeaturedProducts from "@/components/FeaturedProducts";
import PromoBanner from "@/components/PromoBanner";

const Index = () => (
  <>
    <Header />
    <main>
      <HeroSection />
      <CategoryGrid />
      <FeaturedProducts />
      <PromoBanner />
    </main>
    <Footer />
  </>
);

export default Index;
