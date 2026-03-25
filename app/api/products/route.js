import { supabase } from "src/services/reducers/supabaseClient";

export async function GET() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return Response.json({ error: error.message }, { status: 400 });

  return Response.json(data);
}

export async function POST(req) {
  const body = await req.json();

  const { error } = await supabase.from("products").insert(body);

  if (error) return Response.json({ error: error.message }, { status: 400 });

  return Response.json({ message: "Product created" });
}
