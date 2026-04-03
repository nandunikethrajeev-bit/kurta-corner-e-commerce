import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { ShoppingBag, Heart, ChevronLeft, Star, Truck, RotateCcw, Shield } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useProduct, useProducts } from "@/hooks/useProducts";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";
import ProductCard from "@/components/ProductCard";

const ProductDetail = () => {
  const { id } = useParams();
  const { data: product, isLoading } = useProduct(id);
  const [selectedSize, setSelectedSize] = useState("");
  const { addItem } = useCart();
  const { toast } = useToast();

  const { data: relatedProducts } = useProducts({ category: product?.category });
  const related = (relatedProducts || []).filter((p) => p.id !== product?.id).slice(0, 4);

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="container py-20 text-center">
          <div className="animate-pulse text-muted-foreground">Loading product...</div>
        </div>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Header />
        <div className="container py-20 text-center">
          <p className="text-muted-foreground">Product not found.</p>
          <Link to="/products" className="text-accent underline mt-4 inline-block">Browse all products</Link>
        </div>
        <Footer />
      </>
    );
  }

  const discount = product.original_price
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : 0;

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({ title: "Please select a size", variant: "destructive" });
      return;
    }
    addItem(product, selectedSize);
    toast({ title: "Added to cart", description: `${product.name} (${selectedSize})` });
  };



  return (
    <>
      <Header />
      <main className="container py-6 min-h-screen">
        <Link to="/products" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ChevronLeft className="w-4 h-4" /> Back to shop
        </Link>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-14 animate-reveal-up">
          <div className="rounded-lg overflow-hidden bg-card aspect-[3/4]">
            <img src={mainImage} alt={product.name} className="w-full h-full object-cover" />
          </div>

          <div className="flex flex-col">
            {product.is_featured && (
              <span className="self-start text-xs font-semibold bg-secondary text-secondary-foreground px-2.5 py-1 rounded-sm mb-3">
                Featured
              </span>
            )}
            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">{product.category}</p>
            <h1 className="text-2xl md:text-3xl font-display font-bold leading-tight mb-3">{product.name}</h1>

            <div className="flex items-baseline gap-3 mt-4 mb-6">
              <span className="text-2xl font-bold">₹{Number(product.price).toLocaleString("en-IN")}</span>
              {product.original_price && (
                <>
                  <span className="text-lg text-muted-foreground line-through">₹{Number(product.original_price).toLocaleString("en-IN")}</span>
                  <span className="text-sm font-semibold text-accent">{discount}% off</span>
                </>
              )}
            </div>

            <div className="mb-6">
              <p className="text-sm font-medium mb-3">Select Size</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[3rem] px-4 py-2.5 text-sm font-medium rounded-sm border transition-all active:scale-95 ${
                      selectedSize === size
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border hover:border-foreground/30"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3 mb-8">
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3.5 rounded-sm font-semibold text-sm hover:bg-primary/90 transition-colors active:scale-[0.97]"
              >
                <ShoppingBag className="w-4 h-4" /> Add to Cart
              </button>
              <button className="p-3.5 border border-border rounded-sm hover:bg-muted transition-colors active:scale-95" aria-label="Add to wishlist">
                <Heart className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 py-6 border-t border-border text-center">
              <div className="flex flex-col items-center gap-1.5">
                <Truck className="w-5 h-5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Free Delivery</span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <RotateCcw className="w-5 h-5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Easy Returns</span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <Shield className="w-5 h-5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Genuine Product</span>
              </div>
            </div>

            <div className="mt-6">
              <h2 className="font-display text-lg font-semibold mb-2">Description</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>
            </div>

            {product.stock !== undefined && product.stock <= 5 && product.stock > 0 && (
              <p className="text-sm text-destructive mt-4 font-medium">Only {product.stock} left in stock!</p>
            )}
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-20">
            <h2 className="text-2xl font-display font-semibold mb-8">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
};

export default ProductDetail;
