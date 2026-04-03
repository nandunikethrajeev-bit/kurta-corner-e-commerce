import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import type { Tables } from "@/integrations/supabase/types";

export type DBProduct = Tables<"products">;

export type CartItem = {
  product: DBProduct;
  quantity: number;
  size: string;
};

type CartContextType = {
  items: CartItem[];
  addItem: (product: DBProduct, size: string) => void;
  removeItem: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  loading: boolean;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const LOCAL_KEY = "kc_guest_cart";

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  // Load cart
  useEffect(() => {
    if (user) {
      loadDbCart();
    } else {
      loadLocalCart();
    }
  }, [user]);

  const loadLocalCart = () => {
    try {
      const stored = localStorage.getItem(LOCAL_KEY);
      if (stored) setItems(JSON.parse(stored));
      else setItems([]);
    } catch { setItems([]); }
  };

  const saveLocalCart = (newItems: CartItem[]) => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(newItems));
  };

  const loadDbCart = async () => {
    if (!user) return;
    setLoading(true);
    const { data: cartRows } = await supabase
      .from("cart_items")
      .select("*")
      .eq("user_id", user.id);

    if (!cartRows || cartRows.length === 0) {
      // Merge guest cart into DB
      const guestItems = (() => {
        try { return JSON.parse(localStorage.getItem(LOCAL_KEY) || "[]") as CartItem[]; } catch { return []; }
      })();
      if (guestItems.length > 0) {
        for (const gi of guestItems) {
          await supabase.from("cart_items").upsert({
            user_id: user.id,
            product_id: gi.product.id,
            size: gi.size,
            quantity: gi.quantity,
          }, { onConflict: "user_id,product_id,size" });
        }
        localStorage.removeItem(LOCAL_KEY);
        return loadDbCart();
      }
      setItems([]);
      setLoading(false);
      return;
    }

    // Fetch product data for each cart item
    const productIds = [...new Set(cartRows.map(r => r.product_id))];
    const { data: products } = await supabase
      .from("products")
      .select("*")
      .in("id", productIds);

    const productMap = new Map((products || []).map(p => [p.id, p]));
    const cartItems: CartItem[] = cartRows
      .filter(r => productMap.has(r.product_id))
      .map(r => ({
        product: productMap.get(r.product_id)!,
        quantity: r.quantity,
        size: r.size,
      }));

    setItems(cartItems);
    localStorage.removeItem(LOCAL_KEY);
    setLoading(false);
  };

  const addItem = useCallback(async (product: DBProduct, size: string) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id && i.size === size);
      const newItems = existing
        ? prev.map((i) => i.product.id === product.id && i.size === size ? { ...i, quantity: i.quantity + 1 } : i)
        : [...prev, { product, quantity: 1, size }];
      if (!user) saveLocalCart(newItems);
      return newItems;
    });

    if (user) {
      await supabase.from("cart_items").upsert({
        user_id: user.id,
        product_id: product.id,
        size,
        quantity: (items.find(i => i.product.id === product.id && i.size === size)?.quantity || 0) + 1,
      }, { onConflict: "user_id,product_id,size" });
    }
  }, [user, items]);

  const removeItem = useCallback(async (productId: string, size: string) => {
    setItems((prev) => {
      const newItems = prev.filter((i) => !(i.product.id === productId && i.size === size));
      if (!user) saveLocalCart(newItems);
      return newItems;
    });

    if (user) {
      await supabase.from("cart_items")
        .delete()
        .eq("user_id", user.id)
        .eq("product_id", productId)
        .eq("size", size);
    }
  }, [user]);

  const updateQuantity = useCallback(async (productId: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId, size);
      return;
    }
    setItems((prev) => {
      const newItems = prev.map((i) => i.product.id === productId && i.size === size ? { ...i, quantity } : i);
      if (!user) saveLocalCart(newItems);
      return newItems;
    });

    if (user) {
      await supabase.from("cart_items")
        .update({ quantity })
        .eq("user_id", user.id)
        .eq("product_id", productId)
        .eq("size", size);
    }
  }, [user, removeItem]);

  const clearCart = useCallback(async () => {
    setItems([]);
    if (user) {
      await supabase.from("cart_items").delete().eq("user_id", user.id);
    } else {
      localStorage.removeItem(LOCAL_KEY);
    }
  }, [user]);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + Number(i.product.price) * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice, loading }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
