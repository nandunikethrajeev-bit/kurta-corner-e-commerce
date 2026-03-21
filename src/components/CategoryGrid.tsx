import { Link } from "react-router-dom";
import kurtaMen1 from "@/assets/products/kurta-men-1.jpg";
import kurtaWomen1 from "@/assets/products/kurta-women-1.jpg";
import kurtaKids1 from "@/assets/products/kurta-kids-1.jpg";
import ethnicCollection from "@/assets/products/ethnic-collection.jpg";

const categories = [
  { label: "Men", image: kurtaMen1, to: "/products?category=men" },
  { label: "Women", image: kurtaWomen1, to: "/products?category=women" },
  { label: "Kids", image: kurtaKids1, to: "/products?category=kids" },
  { label: "Ethnic Wear", image: ethnicCollection, to: "/products?category=ethnic" },
];

const CategoryGrid = () => (
  <section className="container py-20">
    <h2 className="text-3xl md:text-4xl font-display text-center mb-3 animate-reveal-up">Shop by Category</h2>
    <p className="text-muted-foreground text-center mb-12 animate-reveal-up stagger-1">Find the perfect kurta for every member of the family</p>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      {categories.map((cat, i) => (
        <Link
          key={cat.label}
          to={cat.to}
          className={`group relative overflow-hidden rounded-lg aspect-[3/4] animate-reveal-up stagger-${i + 1}`}
        >
          <img
            src={cat.image}
            alt={cat.label}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
            <h3 className="text-primary-foreground font-display text-lg md:text-xl font-semibold">{cat.label}</h3>
            <span className="text-primary-foreground/70 text-xs font-body mt-1 group-hover:text-primary-foreground transition-colors">
              Shop now →
            </span>
          </div>
        </Link>
      ))}
    </div>
  </section>
);

export default CategoryGrid;
