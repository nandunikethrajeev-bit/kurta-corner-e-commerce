import { Link } from "react-router-dom";
import heroBanner from "@/assets/hero-banner.jpg";

const HeroSection = () => (
  <section className="relative h-[70vh] md:h-[85vh] overflow-hidden">
    <img
      src={heroBanner}
      alt="Kurta Corner ethnic wear collection"
      className="absolute inset-0 w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-r from-foreground/60 via-foreground/30 to-transparent" />

    <div className="relative container h-full flex items-center">
      <div className="max-w-lg animate-reveal-up">
        <p className="text-sm font-body font-medium tracking-widest uppercase text-primary-foreground/80 mb-4">
          Handcrafted in Bengaluru
        </p>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-primary-foreground leading-[1.05] mb-6">
          Timeless
          <br />
          Indian Elegance
        </h1>
        <p className="text-primary-foreground/80 font-body text-base md:text-lg mb-8 max-w-md leading-relaxed">
          Discover kurtas that honour tradition while embracing modern comfort. From everyday cotton to festive silk — crafted for you.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/products"
            className="inline-flex items-center px-8 py-3.5 bg-primary-foreground text-foreground font-semibold text-sm rounded-sm hover:bg-primary-foreground/90 transition-colors active:scale-[0.97] duration-150"
          >
            Explore Collection
          </Link>
          <Link
            to="/products?category=women"
            className="inline-flex items-center px-8 py-3.5 border border-primary-foreground/40 text-primary-foreground font-semibold text-sm rounded-sm hover:bg-primary-foreground/10 transition-colors active:scale-[0.97] duration-150"
          >
            Women's Wear
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
