import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";

const Cart = () => {
  const { items, updateQuantity, removeItem, totalPrice } = useCart();

  return (
    <>
      <Header />
      <main className="container py-8 min-h-screen">
        <h1 className="text-3xl font-display font-bold mb-8 animate-reveal-up">Your Cart</h1>

        {items.length === 0 ? (
          <div className="text-center py-20 animate-reveal-up">
            <ShoppingBag className="w-12 h-12 mx-auto text-muted-foreground/40 mb-4" />
            <p className="text-muted-foreground mb-4">Your cart is empty</p>
            <Link to="/products" className="inline-flex px-6 py-3 bg-primary text-primary-foreground font-semibold text-sm rounded-sm hover:bg-primary/90 transition-colors active:scale-[0.97]">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8 animate-reveal-up">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => {
<<<<<<< HEAD
                const mainImage = item.product.image_url || "/placeholder.svg";
=======
                const mainImage = item.product.images?.[0] || "/placeholder.svg";
>>>>>>> a8542bc21336867072c7d765f7d8737c759c3039
                return (
                  <div key={`${item.product.id}-${item.size}`} className="flex gap-4 p-4 bg-card rounded-lg border border-border">
                    <Link to={`/product/${item.product.id}`} className="w-24 h-32 rounded overflow-hidden shrink-0">
                      <img src={mainImage} alt={item.product.name} className="w-full h-full object-cover" />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link to={`/product/${item.product.id}`} className="font-medium text-sm leading-snug line-clamp-2 hover:text-accent transition-colors">
                        {item.product.name}
                      </Link>
                      <p className="text-xs text-muted-foreground mt-1">Size: {item.size}</p>
                      <p className="font-semibold text-sm mt-2">₹{Number(item.product.price).toLocaleString("en-IN")}</p>

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-1 border border-border rounded-sm">
                          <button onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)} className="p-1.5 hover:bg-muted transition-colors active:scale-90">
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-8 text-center text-sm font-medium tabular-nums">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)} className="p-1.5 hover:bg-muted transition-colors active:scale-90">
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <button onClick={() => removeItem(item.product.id, item.size)} className="p-1.5 text-muted-foreground hover:text-destructive transition-colors active:scale-90">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-card border border-border rounded-lg p-6 h-fit sticky top-24">
              <h2 className="font-display text-lg font-semibold mb-4">Order Summary</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>₹{totalPrice.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery</span>
                  <span className="text-accent font-medium">Free</span>
                </div>
              </div>
              <div className="border-t border-border mt-4 pt-4 flex justify-between font-semibold">
                <span>Total</span>
                <span>₹{totalPrice.toLocaleString("en-IN")}</span>
              </div>

              <Link
                to="/checkout"
                className="w-full mt-6 flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3.5 rounded-sm font-semibold text-sm hover:bg-primary/90 transition-colors active:scale-[0.97]"
              >
                Proceed to Checkout
              </Link>

              <p className="text-xs text-muted-foreground text-center mt-4">
                💬 Need help? <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="underline">Chat on WhatsApp</a>
              </p>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default Cart;
