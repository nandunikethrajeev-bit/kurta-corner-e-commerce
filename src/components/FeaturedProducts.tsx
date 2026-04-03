import ProductCard from "./ProductCard";
import { useProducts } from "@/hooks/useProducts";
import { motion } from "framer-motion";

const FeaturedProducts = () => {
  const { data: featured = [], isLoading } = useProducts({ featured: true });

  if (isLoading) {
    return (
      <section className="container py-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="glass-card rounded-2xl aspect-[3/4] animate-pulse" />
          ))}
        </div>
      </section>
    );
  }

  if (featured.length === 0) return null;

  return (
    <section className="container py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="text-center mb-16"
      >
        <p className="text-xs font-semibold text-primary uppercase tracking-[0.3em] mb-3">✦ Hand-picked</p>
        <h2 className="text-4xl md:text-5xl font-display gradient-text glow-text">Curated for You</h2>
        <p className="text-muted-foreground mt-4 max-w-md mx-auto">
          Our most loved pieces, handpicked this season
        </p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8">
        {featured.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
