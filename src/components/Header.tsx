import { Link } from "react-router-dom";
import { ShoppingBag, Search, Heart, Menu, X, User, LogOut } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import logo from "@/assets/logo.png";

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

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container flex items-center justify-between h-16 md:h-20">
        <button
          className="md:hidden p-2 -ml-2 active:scale-95 transition-transform"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        <Link to="/" className="flex items-center gap-2 active:scale-98 transition-transform">
          <img src={logo} alt="Kurta Corner" className="h-10 md:h-12 w-auto" />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="text-sm font-medium tracking-wide text-foreground/70 hover:text-foreground transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/products" className="p-2 hover:bg-muted rounded-full transition-colors" aria-label="Search">
            <Search className="w-5 h-5" />
          </Link>
          <Link to="/cart" className="p-2 hover:bg-muted rounded-full transition-colors relative" aria-label="Cart">
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-accent text-accent-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                {totalItems}
              </span>
            )}
          </Link>

          {user ? (
            <div className="flex items-center gap-1">
              {isAdmin && (
                <Link to="/admin" className="hidden md:flex text-xs font-semibold bg-primary text-primary-foreground px-3 py-1.5 rounded-sm hover:bg-primary/90 transition-colors">
                  Admin
                </Link>
              )}
              <Link to="/orders" className="p-2 hover:bg-muted rounded-full transition-colors" aria-label="My Orders">
                <User className="w-5 h-5" />
              </Link>
              <button onClick={() => signOut()} className="p-2 hover:bg-muted rounded-full transition-colors" aria-label="Sign out">
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link to="/auth" className="hidden md:flex text-sm font-medium px-4 py-2 bg-primary text-primary-foreground rounded-sm hover:bg-primary/90 transition-colors active:scale-[0.97]">
              Sign In
            </Link>
          )}
        </div>
      </div>

      {mobileOpen && (
        <nav className="md:hidden border-t border-border bg-background animate-fade-in">
          <div className="container py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link key={link.label} to={link.to} className="text-sm font-medium py-2 text-foreground/70 hover:text-foreground transition-colors" onClick={() => setMobileOpen(false)}>
                {link.label}
              </Link>
            ))}
            {!user && (
              <Link to="/auth" className="text-sm font-medium py-2 text-accent" onClick={() => setMobileOpen(false)}>
                Sign In / Sign Up
              </Link>
            )}
            {user && isAdmin && (
              <Link to="/admin" className="text-sm font-medium py-2 text-accent" onClick={() => setMobileOpen(false)}>
                Admin Dashboard
              </Link>
            )}
            {user && (
              <Link to="/orders" className="text-sm font-medium py-2 text-foreground/70" onClick={() => setMobileOpen(false)}>
                My Orders
              </Link>
            )}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
