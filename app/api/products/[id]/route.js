import { supabase } from "src/services/reducers/supabaseClient";

export async function GET(_, { params }) {
  const { id } = await params;
  console.log(id);
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return Response.json({ error: error.message }, { status: 404 });

  return Response.json(data);
}
