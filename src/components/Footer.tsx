import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";

const Footer = () => (
  <footer className="bg-primary text-primary-foreground mt-24">
    <div className="container py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand */}
        <div>
          <h3 className="text-xl font-display mb-4">Kurta Corner</h3>
          <p className="text-sm opacity-80 leading-relaxed mb-4">
            Bengaluru's finest destination for authentic Indian ethnic wear. Handcrafted kurtas for every occasion.
          </p>
          <a
            href="https://wa.me/919876543210?text=Hi%20Kurta%20Corner!%20I'd%20like%20to%20know%20more%20about%20your%20collection."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm bg-primary-foreground/10 hover:bg-primary-foreground/20 px-4 py-2 rounded-md transition-colors"
          >
            💬 Chat on WhatsApp
          </a>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold font-body text-sm uppercase tracking-wider mb-4 opacity-70">Shop</h4>
          <div className="flex flex-col gap-2">
            {["Men", "Women", "Kids", "Ethnic Wear"].map((cat) => (
              <Link key={cat} to={`/products?category=${cat.toLowerCase().replace(" ", "")}`} className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                {cat}
              </Link>
            ))}
          </div>
        </div>

        {/* Help */}
        <div>
          <h4 className="font-semibold font-body text-sm uppercase tracking-wider mb-4 opacity-70">Help</h4>
          <div className="flex flex-col gap-2 text-sm opacity-80">
            <span>Shipping & Returns</span>
            <span>Size Guide</span>
            <span>Track Order</span>
            <span>FAQs</span>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold font-body text-sm uppercase tracking-wider mb-4 opacity-70">Visit Us</h4>
          <div className="flex flex-col gap-3 text-sm opacity-80">
            <a href="https://maps.google.com/?q=Bengaluru+Commercial+Street" target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 hover:opacity-100 transition-opacity">
              <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
              Commercial Street, Bengaluru, Karnataka 560001
            </a>
            <a href="tel:+919876543210" className="flex items-center gap-2 hover:opacity-100 transition-opacity">
              <Phone className="w-4 h-4 shrink-0" />
              +91 98765 43210
            </a>
            <a href="mailto:hello@kurtacorner.in" className="flex items-center gap-2 hover:opacity-100 transition-opacity">
              <Mail className="w-4 h-4 shrink-0" />
              hello@kurtacorner.in
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10 mt-12 pt-8 text-center text-xs opacity-60">
        © 2026 Kurta Corner, Bengaluru. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
