import { createSupabaseFrontendClient } from "@/supabase/createSupabaseFrontendClient";

export async function handleDeleteDestination(trip_id: string) {
  const supabase = createSupabaseFrontendClient();

  const { error } = await supabase.from("trip").delete().eq("id", trip_id);

  if (error) return false;
  return true;
}
