import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type DBProduct = Tables<"products">;

const ProductCard = ({ product, className = "" }: { product: DBProduct; className?: string }) => {
  const price = Number(product.price);
  const originalPrice = product.original_price ? Number(product.original_price) : null;
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;
  const mainImage = product.images?.[0] || "/placeholder.svg";

  return (
    <Link to={`/product/${product.id}`} className={`group block ${className}`}>
      <div className="relative overflow-hidden rounded-lg bg-card aspect-[3/4]">
        <img
          src={mainImage}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <button
          className="absolute top-3 right-3 w-9 h-9 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-background active:scale-95"
          onClick={(e) => { e.preventDefault(); }}
          aria-label="Add to wishlist"
        >
          <Heart className="w-4 h-4" />
        </button>
        {product.is_featured && (
          <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-semibold px-2.5 py-1 rounded-sm">
            Featured
          </span>
        )}
      </div>

      <div className="mt-3 space-y-1">
        <p className="text-xs text-muted-foreground uppercase tracking-wider">{product.category}</p>
        <h3 className="text-sm font-medium leading-snug line-clamp-2 group-hover:text-accent transition-colors">
          {product.name}
        </h3>
        <div className="flex items-baseline gap-2">
          <span className="font-semibold">₹{price.toLocaleString("en-IN")}</span>
          {originalPrice && (
            <>
              <span className="text-sm text-muted-foreground line-through">₹{originalPrice.toLocaleString("en-IN")}</span>
              <span className="text-xs font-medium text-accent">{discount}% off</span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
