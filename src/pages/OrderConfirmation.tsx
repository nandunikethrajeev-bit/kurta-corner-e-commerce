import { Link } from "react-router-dom";
import { CheckCircle2, Package, Truck, MapPin, PartyPopper } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const steps = [
  { icon: CheckCircle2, label: "Order Placed", active: true },
  { icon: Package, label: "Packed", active: false },
  { icon: Truck, label: "Shipped", active: false },
  { icon: MapPin, label: "Delivered", active: false },
];

const OrderConfirmation = () => (
  <>
    <Header />
    <main className="container py-16 min-h-screen text-center">
      <div className="max-w-lg mx-auto animate-reveal-up">
        <PartyPopper className="w-14 h-14 mx-auto text-gold mb-6" />
        <h1 className="text-3xl font-display font-bold mb-3">Order Confirmed!</h1>
        <p className="text-muted-foreground mb-2">Thank you for shopping with Kurta Corner.</p>
        <p className="text-sm text-muted-foreground mb-10">
          Order #KC{Math.floor(100000 + Math.random() * 900000)} · We'll send updates to your email.
        </p>

        {/* Tracking */}
        <div className="flex items-center justify-between max-w-sm mx-auto mb-12">
          {steps.map((step, i) => (
            <div key={step.label} className="flex flex-col items-center gap-2 relative">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step.active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                <step.icon className="w-5 h-5" />
              </div>
              <span className={`text-xs ${step.active ? "font-semibold" : "text-muted-foreground"}`}>{step.label}</span>
              {i < steps.length - 1 && (
                <div className={`absolute top-5 left-full w-12 sm:w-16 h-0.5 -translate-y-1/2 ${step.active ? "bg-primary" : "bg-border"}`} />
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/products" className="px-6 py-3 bg-primary text-primary-foreground font-semibold text-sm rounded-sm hover:bg-primary/90 transition-colors active:scale-[0.97]">
            Continue Shopping
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

export default OrderConfirmation;
