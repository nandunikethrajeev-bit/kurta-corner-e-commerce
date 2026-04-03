import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import { useProducts } from "@/hooks/useProducts";
import { Flame } from "lucide-react";

const TrendingSection = () => {
  const { data: products = [] } = useProducts({});
  const trending = products.slice(0, 3);

  if (trending.length === 0) return null;

  return (
    <section className="container py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="text-center mb-16"
      >
        <div className="flex items-center justify-center gap-2 mb-3">
          <Flame className="w-4 h-4 text-primary" />
          <p className="text-xs font-semibold text-primary uppercase tracking-[0.3em]">Trending Now</p>
        </div>
        <h2 className="text-4xl md:text-5xl font-display gradient-text glow-text">
          What Everyone's Wearing
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {trending.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className="relative"
          >
            {/* Glow ring behind card */}
            <div className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `radial-gradient(circle, hsl(36 90% 52% / 0.2), transparent 70%)` }} />
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TrendingSection;
