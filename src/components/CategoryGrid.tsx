import { Link } from "react-router-dom";
import { motion } from "framer-motion";
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
  <section className="container py-24">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7 }}
      className="text-center mb-16"
    >
      <p className="text-xs font-semibold text-primary uppercase tracking-[0.3em] mb-3">✦ Browse</p>
      <h2 className="text-4xl md:text-5xl font-display gradient-text glow-text">Shop by Category</h2>
      <p className="text-muted-foreground mt-4 max-w-md mx-auto">
        Find the perfect kurta for every member of the family
      </p>
    </motion.div>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8">
      {categories.map((cat, i) => (
        <motion.div
          key={cat.label}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: i * 0.1 }}
        >
          <Link
            to={cat.to}
            className="group relative overflow-hidden rounded-2xl aspect-[3/4] block glass-card"
          >
            <img
              src={cat.image}
              alt={cat.label}
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `radial-gradient(circle at center, hsl(36 90% 52% / 0.15), transparent 70%)` }} />
            <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
              <h3 className="text-foreground font-display text-xl md:text-2xl font-bold">{cat.label}</h3>
              <span className="text-primary text-xs font-body mt-1 group-hover:tracking-wider transition-all duration-300 inline-block">
                Explore →
              </span>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  </section>
);

export default CategoryGrid;
