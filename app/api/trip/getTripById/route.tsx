import { NextRequest, NextResponse } from "next/server";

import { createSupabaseServerClient } from "@/supabase/createSupabaseServerClient";

export async function POST(req: NextRequest): Promise<NextResponse> {
  const { trip_id } = await req.json();

  const supabase = createSupabaseServerClient();

  let tripData = [];

  const { data, error } = await supabase
    .from("trip")
    .select("*")
    .eq("id", trip_id);

  if (error) return NextResponse.json({ status: 400, error: error });
  tripData = data[0];

  return NextResponse.json({ status: 200, tripData: tripData });
}
