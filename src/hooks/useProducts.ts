import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export type DBProduct = Tables<"products">;

export const useProducts = (options?: { category?: string; featured?: boolean; search?: string }) => {
  return useQuery({
    queryKey: ["products", options],
    queryFn: async () => {
      let query = supabase.from("products").select("*").eq("is_active", true);

      if (options?.category && options.category !== "all") {
        query = query.eq("category", options.category);
      }
      if (options?.featured) {
        query = query.eq("is_featured", true);
      }
      if (options?.search) {
        query = query.or(`name.ilike.%${options.search}%,description.ilike.%${options.search}%`);
      }

      const { data, error } = await query.order("created_at", { ascending: false });
      if (error) throw error;
      return data as DBProduct[];
    },
  });
};

export const useProduct = (id: string | undefined) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      if (!id) throw new Error("No product ID");
      const { data, error } = await supabase.from("products").select("*").eq("id", id).single();
      if (error) throw error;
      return data as DBProduct;
    },
    enabled: !!id,
  });
};
