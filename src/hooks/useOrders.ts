import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import type { Tables } from "@/integrations/supabase/types";

export type DBOrder = Tables<"orders">;
export type DBOrderItem = Tables<"order_items">;

export const useMyOrders = () => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["my-orders", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*, order_items(*)")
        .eq("user_id", user!.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });
};

export const usePlaceOrder = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: {
      address: { full_name: string; phone: string; address_line: string; city: string; state: string; pincode: string };
      items: { product_id: string; product_name: string; product_image: string | null; size: string; quantity: number; price: number }[];
      subtotal: number;
      total: number;
      payment_method: string;
    }) => {
      if (!user) throw new Error("Must be logged in");

      // Save address
      const { data: addr, error: addrErr } = await supabase
        .from("addresses")
        .insert({ ...input.address, user_id: user.id })
        .select()
        .single();
      if (addrErr) throw addrErr;

      // Create order
      const estimatedDelivery = new Date();
      estimatedDelivery.setDate(estimatedDelivery.getDate() + 5);

      const { data: order, error: orderErr } = await supabase
        .from("orders")
        .insert({
          user_id: user.id,
          address_id: addr.id,
          subtotal: input.subtotal,
          total: input.total,
          payment_method: input.payment_method,
          payment_status: input.payment_method === "cod" ? "pending" : "pending",
          estimated_delivery: estimatedDelivery.toISOString().split("T")[0],
        })
        .select()
        .single();
      if (orderErr) throw orderErr;

      // Insert order items
      const orderItems = input.items.map((item) => ({
        order_id: order.id,
        ...item,
      }));
      const { error: itemsErr } = await supabase.from("order_items").insert(orderItems);
      if (itemsErr) throw itemsErr;

      return order;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-orders"] });
    },
  });
};
