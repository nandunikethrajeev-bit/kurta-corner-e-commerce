import { products } from "@/data/products";
import ProductCard from "./ProductCard";

const FeaturedProducts = () => {
  const featured = products.filter((p) => p.badge);

  return (
    <section className="container py-20">
      <h2 className="text-3xl md:text-4xl font-display text-center mb-3 animate-reveal-up">Curated for You</h2>
      <p className="text-muted-foreground text-center mb-12 animate-reveal-up stagger-1">Our most loved pieces, handpicked this season</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {featured.map((product, i) => (
          <ProductCard
            key={product.id}
            product={product}
            className={`animate-reveal-up stagger-${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
