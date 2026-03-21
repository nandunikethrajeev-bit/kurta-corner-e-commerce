import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useMyOrders } from "@/hooks/useOrders";
import { useAuth } from "@/context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Package, ChevronRight } from "lucide-react";

const statusColors: Record<string, string> = {
  placed: "bg-blue-100 text-blue-700",
  packed: "bg-yellow-100 text-yellow-700",
  shipped: "bg-purple-100 text-purple-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

const Orders = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { data: orders = [], isLoading } = useMyOrders();

  if (!authLoading && !user) {
    navigate("/auth");
    return null;
  }

  return (
    <>
      <Header />
      <main className="container py-8 min-h-screen">
        <h1 className="text-3xl font-display font-bold mb-8 animate-reveal-up">My Orders</h1>

        {isLoading ? (
          <div className="text-center py-20 text-muted-foreground animate-pulse">Loading orders...</div>
        ) : orders.length === 0 ? (
          <div className="text-center py-20 animate-reveal-up">
            <Package className="w-12 h-12 mx-auto text-muted-foreground/40 mb-4" />
            <p className="text-muted-foreground mb-4">No orders yet</p>
            <Link to="/products" className="inline-flex px-6 py-3 bg-primary text-primary-foreground font-semibold text-sm rounded-sm hover:bg-primary/90 transition-colors">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4 animate-reveal-up">
            {orders.map((order: any) => (
              <Link
                key={order.id}
                to={`/order-confirmation?id=${order.id}`}
                className="block bg-card border border-border rounded-lg p-5 hover:border-foreground/20 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Order ID</p>
                    <p className="font-mono font-medium text-sm">{order.id.slice(0, 8).toUpperCase()}</p>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${statusColors[order.status] || "bg-muted text-muted-foreground"}`}>
                    {order.status}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {new Date(order.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                      {" · "}
                      {order.order_items?.length || 0} item{(order.order_items?.length || 0) !== 1 ? "s" : ""}
                    </p>
                    <p className="font-semibold text-sm mt-1">₹{Number(order.total).toLocaleString("en-IN")}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default Orders;
