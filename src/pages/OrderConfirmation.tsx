import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle2, Package, Truck, MapPin, PartyPopper } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const statusSteps = [
  { key: "placed", icon: CheckCircle2, label: "Order Placed" },
  { key: "packed", icon: Package, label: "Packed" },
  { key: "shipped", icon: Truck, label: "Shipped" },
  { key: "delivered", icon: MapPin, label: "Delivered" },
];

const OrderConfirmation = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("id");

  const { data: order } = useQuery({
    queryKey: ["order", orderId],
    queryFn: async () => {
      if (!orderId) return null;
      const { data, error } = await supabase
        .from("orders")
        .select("*, order_items(*), addresses(*)")
        .eq("id", orderId)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!orderId,
  });

  const currentStatusIndex = order ? statusSteps.findIndex((s) => s.key === order.status) : 0;

  return (
    <>
      <Header />
      <main className="container py-16 min-h-screen text-center">
        <div className="max-w-lg mx-auto animate-reveal-up">
          <PartyPopper className="w-14 h-14 mx-auto text-gold mb-6" />
          <h1 className="text-3xl font-display font-bold mb-3">Order Confirmed!</h1>
          <p className="text-muted-foreground mb-2">Thank you for shopping with Kurta Corner.</p>
          {order && (
            <p className="text-sm text-muted-foreground mb-2">
              Order ID: <span className="font-mono font-medium text-foreground">{order.id.slice(0, 8).toUpperCase()}</span>
            </p>
          )}
          {order?.estimated_delivery && (
            <p className="text-sm text-muted-foreground mb-10">
              Estimated delivery: <span className="font-medium text-foreground">{new Date(order.estimated_delivery).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</span>
            </p>
          )}

          <div className="flex items-center justify-between max-w-sm mx-auto mb-12">
            {statusSteps.map((step, i) => (
              <div key={step.key} className="flex flex-col items-center gap-2 relative">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${i <= currentStatusIndex ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                  <step.icon className="w-5 h-5" />
                </div>
                <span className={`text-xs ${i <= currentStatusIndex ? "font-semibold" : "text-muted-foreground"}`}>{step.label}</span>
                {i < statusSteps.length - 1 && (
                  <div className={`absolute top-5 left-full w-12 sm:w-16 h-0.5 -translate-y-1/2 ${i < currentStatusIndex ? "bg-primary" : "bg-border"}`} />
                )}
              </div>
            ))}
          </div>

          {order?.order_items && (
            <div className="text-left bg-card border border-border rounded-lg p-4 mb-8">
              <h3 className="font-semibold text-sm mb-3">Order Items</h3>
              {(order.order_items as any[]).map((item: any) => (
                <div key={item.id} className="flex justify-between text-sm py-1.5 border-b border-border last:border-0">
                  <span className="text-muted-foreground">{item.product_name} ({item.size}) × {item.quantity}</span>
                  <span>₹{(Number(item.price) * item.quantity).toLocaleString("en-IN")}</span>
                </div>
              ))}
              <div className="flex justify-between font-semibold text-sm pt-3">
                <span>Total</span>
                <span>₹{Number(order.total).toLocaleString("en-IN")}</span>
              </div>
            </div>
          )}

          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/products" className="px-6 py-3 bg-primary text-primary-foreground font-semibold text-sm rounded-sm hover:bg-primary/90 transition-colors active:scale-[0.97]">
              Continue Shopping
            </Link>
            <Link to="/orders" className="px-6 py-3 border border-border font-semibold text-sm rounded-sm hover:bg-muted transition-colors active:scale-[0.97]">
              View All Orders
            </Link>
            <a
              href="https://wa.me/919876543210?text=Hi!%20I%20just%20placed%20an%20order%20on%20Kurta%20Corner."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-border font-semibold text-sm rounded-sm hover:bg-muted transition-colors active:scale-[0.97]"
            >
              💬 WhatsApp Us
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default OrderConfirmation;
