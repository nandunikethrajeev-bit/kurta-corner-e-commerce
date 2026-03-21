import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Package, ShoppingBag, Users, IndianRupee, Plus, Pencil, Trash2, ChevronDown } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const AdminDashboard = () => {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<"overview" | "products" | "orders" | "users">("overview");
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [showProductForm, setShowProductForm] = useState(false);

  if (!authLoading && (!user || !isAdmin)) {
    navigate("/");
    return null;
  }

  return (
    <>
      <Header />
      <main className="container py-8 min-h-screen">
        <h1 className="text-3xl font-display font-bold mb-8 animate-reveal-up">Admin Dashboard</h1>

        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {(["overview", "products", "orders", "users"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium rounded-sm capitalize transition-colors whitespace-nowrap ${
                activeTab === tab ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "overview" && <OverviewTab />}
        {activeTab === "products" && (
          <ProductsTab
            editingProduct={editingProduct}
            setEditingProduct={setEditingProduct}
            showForm={showProductForm}
            setShowForm={setShowProductForm}
          />
        )}
        {activeTab === "orders" && <OrdersTab />}
        {activeTab === "users" && <UsersTab />}
      </main>
      <Footer />
    </>
  );
};

const OverviewTab = () => {
  const { data: stats } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const [orders, products, profiles] = await Promise.all([
        supabase.from("orders").select("total, status"),
        supabase.from("products").select("id", { count: "exact" }),
        supabase.from("profiles").select("id", { count: "exact" }),
      ]);
      const totalRevenue = (orders.data || []).reduce((sum, o) => sum + Number(o.total), 0);
      const totalOrders = orders.data?.length || 0;
      return {
        revenue: totalRevenue,
        orders: totalOrders,
        products: products.count || 0,
        users: profiles.count || 0,
      };
    },
  });

  const cards = [
    { label: "Revenue", value: `₹${(stats?.revenue || 0).toLocaleString("en-IN")}`, icon: IndianRupee, color: "text-green-600" },
    { label: "Orders", value: stats?.orders || 0, icon: Package, color: "text-blue-600" },
    { label: "Products", value: stats?.products || 0, icon: ShoppingBag, color: "text-purple-600" },
    { label: "Users", value: stats?.users || 0, icon: Users, color: "text-orange-600" },
  ];

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-reveal-up">
      {cards.map((card) => (
        <div key={card.label} className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">{card.label}</span>
            <card.icon className={`w-5 h-5 ${card.color}`} />
          </div>
          <p className="text-2xl font-bold">{card.value}</p>
        </div>
      ))}
    </div>
  );
};

const ProductsTab = ({ editingProduct, setEditingProduct, showForm, setShowForm }: any) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["admin-products"],
    queryFn: async () => {
      const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("products").update({ is_active: false }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      toast({ title: "Product deactivated" });
    },
  });

  return (
    <div className="animate-reveal-up">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Products</h2>
        <button
          onClick={() => { setEditingProduct(null); setShowForm(true); }}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-sm hover:bg-primary/90 transition-colors active:scale-[0.97]"
        >
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      {showForm && (
        <ProductForm
          product={editingProduct}
          onClose={() => { setShowForm(false); setEditingProduct(null); }}
          onSaved={() => {
            setShowForm(false);
            setEditingProduct(null);
            queryClient.invalidateQueries({ queryKey: ["admin-products"] });
          }}
        />
      )}

      {isLoading ? (
        <div className="text-muted-foreground animate-pulse">Loading...</div>
      ) : (
        <div className="space-y-3">
          {products.map((p) => (
            <div key={p.id} className={`flex items-center gap-4 p-4 bg-card border border-border rounded-lg ${!p.is_active ? "opacity-50" : ""}`}>
              <div className="w-16 h-20 rounded bg-muted overflow-hidden shrink-0">
                {p.images?.[0] && <img src={p.images[0]} alt="" className="w-full h-full object-cover" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm line-clamp-1">{p.name}</p>
                <p className="text-xs text-muted-foreground capitalize">{p.category} · Stock: {p.stock}</p>
                <p className="font-semibold text-sm">₹{Number(p.price).toLocaleString("en-IN")}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => { setEditingProduct(p); setShowForm(true); }}
                  className="p-2 hover:bg-muted rounded transition-colors"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteMutation.mutate(p.id)}
                  className="p-2 hover:bg-muted text-destructive rounded transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const ProductForm = ({ product, onClose, onSaved }: { product: any; onClose: () => void; onSaved: () => void }) => {
  const { toast } = useToast();
  const [form, setForm] = useState({
    name: product?.name || "",
    price: product?.price || "",
    original_price: product?.original_price || "",
    category: product?.category || "men",
    description: product?.description || "",
    sizes: product?.sizes?.join(", ") || "S, M, L, XL",
    colors: product?.colors?.join(", ") || "",
    stock: product?.stock || 0,
    is_featured: product?.is_featured || false,
    images: product?.images?.join("\n") || "",
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      name: form.name,
      price: Number(form.price),
      original_price: form.original_price ? Number(form.original_price) : null,
      category: form.category,
      description: form.description,
      sizes: form.sizes.split(",").map((s: string) => s.trim()).filter(Boolean),
      colors: form.colors ? form.colors.split(",").map((s: string) => s.trim()).filter(Boolean) : null,
      stock: Number(form.stock),
      is_featured: form.is_featured,
      images: form.images ? form.images.split("\n").map((s: string) => s.trim()).filter(Boolean) : [],
      is_active: true,
    };

    if (product) {
      const { error } = await supabase.from("products").update(payload).eq("id", product.id);
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); setSaving(false); return; }
      toast({ title: "Product updated" });
    } else {
      const { error } = await supabase.from("products").insert(payload);
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); setSaving(false); return; }
      toast({ title: "Product created" });
    }
    setSaving(false);
    onSaved();
  };

  const inputClass = "w-full px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring";

  return (
    <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-6 mb-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">{product ? "Edit Product" : "New Product"}</h3>
        <button type="button" onClick={onClose} className="text-muted-foreground hover:text-foreground text-sm">Cancel</button>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <input placeholder="Product Name *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} required />
        <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className={inputClass}>
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="kids">Kids</option>
          <option value="ethnic">Ethnic</option>
        </select>
        <input type="number" placeholder="Price *" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className={inputClass} required />
        <input type="number" placeholder="Original Price" value={form.original_price} onChange={(e) => setForm({ ...form, original_price: e.target.value })} className={inputClass} />
        <input placeholder="Sizes (comma-separated)" value={form.sizes} onChange={(e) => setForm({ ...form, sizes: e.target.value })} className={inputClass} />
        <input placeholder="Colors (comma-separated)" value={form.colors} onChange={(e) => setForm({ ...form, colors: e.target.value })} className={inputClass} />
        <input type="number" placeholder="Stock" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} className={inputClass} />
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={form.is_featured} onChange={(e) => setForm({ ...form, is_featured: e.target.checked })} className="accent-primary" />
          Featured Product
        </label>
      </div>
      <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className={`${inputClass}`} rows={3} />
      <textarea placeholder="Image URLs (one per line)" value={form.images} onChange={(e) => setForm({ ...form, images: e.target.value })} className={`${inputClass}`} rows={2} />
      <button type="submit" disabled={saving} className="px-6 py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-sm hover:bg-primary/90 disabled:opacity-50">
        {saving ? "Saving..." : product ? "Update Product" : "Create Product"}
      </button>
    </form>
  );
};

const OrdersTab = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*, order_items(*)")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const statusOptions = ["placed", "packed", "shipped", "delivered", "cancelled"];

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase.from("orders").update({ status }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
      toast({ title: "Order status updated" });
    },
  });

  const statusColors: Record<string, string> = {
    placed: "bg-blue-100 text-blue-700",
    packed: "bg-yellow-100 text-yellow-700",
    shipped: "bg-purple-100 text-purple-700",
    delivered: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
  };

  return (
    <div className="animate-reveal-up">
      <h2 className="text-xl font-semibold mb-6">Orders</h2>
      {isLoading ? (
        <div className="text-muted-foreground animate-pulse">Loading...</div>
      ) : orders.length === 0 ? (
        <p className="text-muted-foreground">No orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order: any) => (
            <div key={order.id} className="bg-card border border-border rounded-lg p-5">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <p className="font-mono font-medium text-sm">{order.id.slice(0, 8).toUpperCase()}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(order.created_at).toLocaleDateString("en-IN")} · {order.payment_method.toUpperCase()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus.mutate({ id: order.id, status: e.target.value })}
                    className={`text-xs font-semibold px-2 py-1 rounded-full border-none cursor-pointer ${statusColors[order.status] || "bg-muted"}`}
                  >
                    {statusOptions.map((s) => (
                      <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="text-sm space-y-1">
                {(order.order_items || []).map((item: any) => (
                  <p key={item.id} className="text-muted-foreground">
                    {item.product_name} ({item.size}) × {item.quantity} — ₹{(Number(item.price) * item.quantity).toLocaleString("en-IN")}
                  </p>
                ))}
              </div>
              <p className="font-semibold text-sm mt-2">Total: ₹{Number(order.total).toLocaleString("en-IN")}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const UsersTab = () => {
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const { data, error } = await supabase.from("profiles").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="animate-reveal-up">
      <h2 className="text-xl font-semibold mb-6">Users</h2>
      {isLoading ? (
        <div className="text-muted-foreground animate-pulse">Loading...</div>
      ) : (
        <div className="space-y-3">
          {users.map((u) => (
            <div key={u.id} className="bg-card border border-border rounded-lg p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
                {(u.full_name || "U").charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-medium text-sm">{u.full_name || "Unnamed User"}</p>
                <p className="text-xs text-muted-foreground">
                  Joined {new Date(u.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
