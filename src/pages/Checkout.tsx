import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "", city: "Bengaluru", pincode: "", payment: "cod" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.address || !form.pincode) {
      toast({ title: "Please fill all required fields", variant: "destructive" });
      return;
    }
    clearCart();
    navigate("/order-confirmation");
  };

  if (items.length === 0) {
    navigate("/cart");
    return null;
  }

  const inputClass = "w-full px-4 py-3 bg-background border border-border rounded-md text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring";

  return (
    <>
      <Header />
      <main className="container py-8 min-h-screen">
        <h1 className="text-3xl font-display font-bold mb-8 animate-reveal-up">Checkout</h1>

        <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8 animate-reveal-up stagger-1">
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="font-display text-lg font-semibold mb-4">Delivery Address</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <input name="name" placeholder="Full Name *" value={form.name} onChange={handleChange} className={inputClass} required />
                <input name="phone" placeholder="Phone Number *" value={form.phone} onChange={handleChange} className={inputClass} required />
                <input name="email" placeholder="Email" value={form.email} onChange={handleChange} className={`${inputClass} sm:col-span-2`} type="email" />
                <textarea name="address" placeholder="Full Address *" value={form.address} onChange={handleChange} className={`${inputClass} sm:col-span-2`} rows={3} required />
                <input name="city" placeholder="City" value={form.city} onChange={handleChange} className={inputClass} />
                <input name="pincode" placeholder="Pincode *" value={form.pincode} onChange={handleChange} className={inputClass} required />
              </div>
            </div>

            {/* Payment */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="font-display text-lg font-semibold mb-4">Payment Method</h2>
              <div className="space-y-3">
                {[
                  { value: "cod", label: "Cash on Delivery", desc: "Pay when your order arrives" },
                  { value: "online", label: "Pay Online", desc: "Cards, UPI, Net Banking (coming soon)" },
                ].map((opt) => (
                  <label key={opt.value} className={`flex items-start gap-3 p-4 border rounded-md cursor-pointer transition-colors ${form.payment === opt.value ? "border-primary bg-secondary/50" : "border-border hover:border-foreground/20"}`}>
                    <input type="radio" name="payment" value={opt.value} checked={form.payment === opt.value} onChange={handleChange} className="mt-1 accent-primary" />
                    <div>
                      <p className="text-sm font-medium">{opt.label}</p>
                      <p className="text-xs text-muted-foreground">{opt.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-card border border-border rounded-lg p-6 h-fit sticky top-24">
            <h2 className="font-display text-lg font-semibold mb-4">Order Summary</h2>
            <div className="space-y-3 mb-4">
              {items.map((item) => (
                <div key={`${item.product.id}-${item.size}`} className="flex justify-between text-sm">
                  <span className="text-muted-foreground line-clamp-1">{item.product.name} × {item.quantity}</span>
                  <span>₹{(item.product.price * item.quantity).toLocaleString("en-IN")}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-4 flex justify-between font-semibold">
              <span>Total</span>
              <span>₹{totalPrice.toLocaleString("en-IN")}</span>
            </div>
            <button
              type="submit"
              className="w-full mt-6 bg-primary text-primary-foreground py-3.5 rounded-sm font-semibold text-sm hover:bg-primary/90 transition-colors active:scale-[0.97]"
            >
              Place Order
            </button>
          </div>
        </form>
      </main>
      <Footer />
    </>
  );
};

export default Checkout;
