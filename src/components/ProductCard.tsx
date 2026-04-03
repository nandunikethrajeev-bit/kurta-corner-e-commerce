import { Link } from "react-router-dom";
import { Heart, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import type { Tables } from "@/integrations/supabase/types";

type DBProduct = Tables<"products">;

const ProductCard = ({ product, className = "" }: { product: DBProduct; className?: string }) => {
  const price = Number(product.price);
  const originalPrice = product.original_price ? Number(product.original_price) : null;
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;
<<<<<<< HEAD
  const mainImage = product.image_url || "/placeholder.svg";
=======
  const mainImage = product.images?.[0] || "/placeholder.svg";
>>>>>>> a8542bc21336867072c7d765f7d8737c759c3039

  return (
    <motion.div
      whileHover={{ y: -8, rotateY: 3, rotateX: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`group ${className}`}
      style={{ perspective: 1000 }}
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative overflow-hidden rounded-2xl glass-card aspect-[3/4]">
          <img
            src={mainImage}
            alt={product.name}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
            loading="lazy"
          />

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

          {/* Quick actions */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
            <button
              className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-primary text-primary-foreground font-semibold text-xs rounded-full glow-button hover:scale-105 transition-transform"
              onClick={(e) => { e.preventDefault(); }}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              Quick Add
            </button>
            <button
              className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              onClick={(e) => { e.preventDefault(); }}
              aria-label="Add to wishlist"
            >
              <Heart className="w-4 h-4" />
            </button>
          </div>

          {/* Badges */}
          {product.is_featured && (
            <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Featured
            </span>
          )}
          {discount > 0 && (
            <span className="absolute top-3 right-3 bg-destructive text-destructive-foreground text-[10px] font-bold px-2.5 py-1 rounded-full">
              -{discount}%
            </span>
          )}
        </div>

        <div className="mt-4 space-y-1.5 px-1">
          <p className="text-[10px] text-primary font-semibold uppercase tracking-[0.2em]">{product.category}</p>
          <h3 className="text-sm font-medium leading-snug line-clamp-2 text-foreground/90 group-hover:text-foreground transition-colors">
            {product.name}
          </h3>
          <div className="flex items-baseline gap-2">
            <span className="font-bold text-foreground">₹{price.toLocaleString("en-IN")}</span>
            {originalPrice && (
              <span className="text-xs text-muted-foreground line-through">₹{originalPrice.toLocaleString("en-IN")}</span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
