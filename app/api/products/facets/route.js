// app/api/products/facets/route.js
import { createClient } from "@supabase/supabase-js";
import { supabase } from "src/services/reducers/supabaseClient";

export async function GET() {
  try {
    const { data: products, error } = await supabase
      .from("products")
      .select("categories, materials, styles, price");

    if (error) throw error;

    const categoriesSet = new Set();
    const materialsSet = new Set();
    const stylesSet = new Set();

    let minPrice = Infinity;
    let maxPrice = -Infinity;

    products.forEach((p) => {
      p.categories?.forEach((c) => categoriesSet.add(c));
      p.materials?.forEach((m) => materialsSet.add(m));
      p.styles?.forEach((s) => stylesSet.add(s));

      if (p.price != null) {
        minPrice = Math.min(minPrice, p.price);
        maxPrice = Math.max(maxPrice, p.price);
      }
    });

    return new Response(
      JSON.stringify({
        categories: Array.from(categoriesSet),
        materials: Array.from(materialsSet),
        styles: Array.from(stylesSet),
        minPrice: isFinite(minPrice) ? minPrice : 0,
        maxPrice: isFinite(maxPrice) ? maxPrice : 0,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
