import { NextRequest, NextResponse } from "next/server";
import { createSupabaseFrontendClient } from "@/supabase/createSupabaseFrontendClient";
import { TripCardType } from "@/helpers/types";

export async function POST(req: NextRequest): Promise<NextResponse> {
  const { user_email } = await req.json();

  const supabase = createSupabaseFrontendClient();

  let cardItineraryList: TripCardType[] = [];

  const { data, error } = await supabase
    .from("trip")
    .select("id, destination, bbox, start_date, end_date, created_date")
    .eq("email", user_email)
    .order("created_date", { ascending: false });

  if (error) return NextResponse.json({ status: 400, error: error });

  cardItineraryList = data;

  return NextResponse.json({
    status: 200,
    cardItineraryList: cardItineraryList,
  });
}
