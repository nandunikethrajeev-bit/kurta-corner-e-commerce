import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import CategoryGrid from "@/components/CategoryGrid";
import FeaturedProducts from "@/components/FeaturedProducts";
import NewCollectionBanner from "@/components/NewCollectionBanner";
import TrendingSection from "@/components/TrendingSection";
import PromoBanner from "@/components/PromoBanner";

const Index = () => (
  <>
    <Header />
    <main>
      <HeroSection />
      <NewCollectionBanner />
      <CategoryGrid />
      <FeaturedProducts />
      <TrendingSection />
      <PromoBanner />
    </main>
    <Footer />
  </>
);

export default Index;
