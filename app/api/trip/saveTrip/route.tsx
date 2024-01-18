import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/supabase/createSupabaseServerClient";

import { DestinationType } from "@/helpers/types";

export async function POST(req: NextRequest): Promise<NextResponse> {
  const { dbPayload }: { dbPayload: DestinationType } = await req.json();

  let current_user_id: string | null = null;
  let trip_id: string = process.env.SECRET_USER_ID!;

  const supabase = createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) current_user_id = user.id;

  const { data, error } = await supabase
    .from("trip")
    .insert({
      destination: dbPayload.name,
      description: dbPayload.description,
      locations: dbPayload.locations,
      bbox: dbPayload.bbox,
      start_date: dbPayload.start_date,
      end_date: dbPayload.end_date,
      created_date: new Date(),
      user_id: current_user_id,
    })
    .select("id");

  if (error) throw error;

  trip_id = data[0].id;

  return NextResponse.json({ status: 200, trip_id: trip_id });
}
