import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, X } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { useProducts } from "@/hooks/useProducts";

const categories = ["all", "men", "women", "kids", "ethnic"] as const;
const priceRanges = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under ₹1,500", min: 0, max: 1500 },
  { label: "₹1,500 – ₹3,000", min: 1500, max: 3000 },
  { label: "₹3,000 – ₹5,000", min: 3000, max: 5000 },
  { label: "Above ₹5,000", min: 5000, max: Infinity },
];

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category") || "all";
  const [search, setSearch] = useState("");
  const [priceRange, setPriceRange] = useState(0);
  const [mobileFilters, setMobileFilters] = useState(false);

  const { data: products = [], isLoading } = useProducts({ category: categoryParam, search });

  const setCategory = (cat: string) => {
    if (cat === "all") searchParams.delete("category");
    else searchParams.set("category", cat);
    setSearchParams(searchParams);
  };

  const filtered = useMemo(() => {
    const { min, max } = priceRanges[priceRange];
    return products.filter((p) => Number(p.price) >= min && Number(p.price) <= max);
  }, [products, priceRange]);

  const FilterPanel = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Category</h3>
        <div className="flex flex-col gap-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`text-left text-sm py-1.5 px-3 rounded-sm transition-colors capitalize ${
                categoryParam === cat ? "bg-primary text-primary-foreground font-medium" : "hover:bg-muted"
              }`}
            >
              {cat === "all" ? "All Categories" : cat === "ethnic" ? "Ethnic Wear" : cat}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Price</h3>
        <div className="flex flex-col gap-1">
          {priceRanges.map((range, i) => (
            <button
              key={range.label}
              onClick={() => setPriceRange(i)}
              className={`text-left text-sm py-1.5 px-3 rounded-sm transition-colors ${
                priceRange === i ? "bg-primary text-primary-foreground font-medium" : "hover:bg-muted"
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Header />
      <main className="container py-8 min-h-screen">
        <div className="mb-8 animate-reveal-up">
          <input
            type="text"
            placeholder="Search kurtas, suits, ethnic wear..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md px-4 py-3 bg-card border border-border rounded-lg text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div className="flex gap-8">
          <aside className="hidden md:block w-56 shrink-0 animate-reveal-up">
            <FilterPanel />
          </aside>

          <button
            className="md:hidden fixed bottom-6 right-6 z-40 bg-primary text-primary-foreground p-3.5 rounded-full shadow-lg active:scale-95 transition-transform"
            onClick={() => setMobileFilters(true)}
          >
            <SlidersHorizontal className="w-5 h-5" />
          </button>

          {mobileFilters && (
            <div className="md:hidden fixed inset-0 z-50 bg-foreground/40 animate-fade-in" onClick={() => setMobileFilters(false)}>
              <div className="absolute right-0 top-0 bottom-0 w-72 bg-background p-6 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display text-lg">Filters</h2>
                  <button onClick={() => setMobileFilters(false)}><X className="w-5 h-5" /></button>
                </div>
                <FilterPanel />
              </div>
            </div>
          )}

          <div className="flex-1">
            {isLoading ? (
              <div className="text-center py-20 text-muted-foreground animate-pulse">Loading products...</div>
            ) : (
              <>
                <p className="text-sm text-muted-foreground mb-4">{filtered.length} product{filtered.length !== 1 ? "s" : ""}</p>
                {filtered.length === 0 ? (
                  <div className="text-center py-20">
                    <p className="text-muted-foreground">No products match your filters.</p>
                    <button onClick={() => { setSearch(""); setPriceRange(0); setCategory("all"); }} className="mt-3 text-sm text-accent underline">
                      Clear all filters
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {filtered.map((product, i) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        className={`animate-reveal-up stagger-${Math.min(i + 1, 5)}`}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Products;
