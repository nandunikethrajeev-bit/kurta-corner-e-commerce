import { Link } from "react-router-dom";
import { ShoppingBag, Search, Heart, Menu, X, User, LogOut } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Men", to: "/products?category=men" },
  { label: "Women", to: "/products?category=women" },
  { label: "Kids", to: "/products?category=kids" },
  { label: "Ethnic Wear", to: "/products?category=ethnic" },
];

const Header = () => {
  const { totalItems } = useCart();
  const { user, isAdmin, signOut } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass shadow-lg shadow-background/50" : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-16 md:h-20">
        <button
          className="md:hidden p-2 -ml-2 active:scale-95 transition-transform text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-xl md:text-2xl font-display font-bold gradient-text tracking-wide">
            KURTA CORNER
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="text-sm font-medium tracking-wide text-foreground/60 hover:text-primary transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-primary hover:after:w-full after:transition-all after:duration-300"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <Link to="/products" className="p-2.5 hover:bg-secondary rounded-full transition-colors" aria-label="Search">
            <Search className="w-4 h-4 text-foreground/70" />
          </Link>
          <Link to="/cart" className="p-2.5 hover:bg-secondary rounded-full transition-colors relative" aria-label="Cart">
            <ShoppingBag className="w-4 h-4 text-foreground/70" />
            {totalItems > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold"
              >
                {totalItems}
              </motion.span>
            )}
          </Link>

          {user ? (
            <div className="flex items-center gap-1">
              {isAdmin && (
                <Link to="/admin" className="hidden md:flex text-xs font-bold bg-primary text-primary-foreground px-3 py-1.5 rounded-full hover:scale-105 transition-transform">
                  Admin
                </Link>
              )}
              <Link to="/orders" className="p-2.5 hover:bg-secondary rounded-full transition-colors" aria-label="My Orders">
                <User className="w-4 h-4 text-foreground/70" />
              </Link>
              <button onClick={() => signOut()} className="p-2.5 hover:bg-secondary rounded-full transition-colors" aria-label="Sign out">
                <LogOut className="w-4 h-4 text-foreground/70" />
              </button>
            </div>
          ) : (
            <Link to="/auth" className="hidden md:flex text-sm font-semibold px-5 py-2 bg-primary text-primary-foreground rounded-full hover:scale-105 transition-all duration-300 glow-button">
              Sign In
            </Link>
          )}
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass overflow-hidden"
          >
            <div className="container py-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link key={link.label} to={link.to} className="text-sm font-medium py-2 text-foreground/70 hover:text-primary transition-colors" onClick={() => setMobileOpen(false)}>
                  {link.label}
                </Link>
              ))}
              {!user && (
                <Link to="/auth" className="text-sm font-medium py-2 text-primary" onClick={() => setMobileOpen(false)}>
                  Sign In / Sign Up
                </Link>
              )}
              {user && isAdmin && (
                <Link to="/admin" className="text-sm font-medium py-2 text-primary" onClick={() => setMobileOpen(false)}>
                  Admin Dashboard
                </Link>
              )}
              {user && (
                <Link to="/orders" className="text-sm font-medium py-2 text-foreground/70" onClick={() => setMobileOpen(false)}>
                  My Orders
                </Link>
              )}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
