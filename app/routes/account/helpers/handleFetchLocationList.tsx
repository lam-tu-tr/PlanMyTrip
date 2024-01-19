import { TripCardType } from "@/helpers/types";
import { createSupabaseServerClient } from "@/supabase/createSupabaseServerClient";

export async function handleFetchLocationList({
  user_id,
}: {
  user_id: string;
}) {
  const supabase = createSupabaseServerClient();
  let cardItineraryList: TripCardType[] = [];

  const { data, error } = await supabase
    .from("trip")
    .select("id, destination, bbox, start_date, end_date, created_date")
    .eq("user_id", user_id)
    .order("created_date", { ascending: false });

  if (data) cardItineraryList = data as TripCardType[];

  if (error) throw new Error("Failed to fetch location list");

  return cardItineraryList;
}
