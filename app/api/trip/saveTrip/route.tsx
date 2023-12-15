import { NextRequest, NextResponse } from "next/server";
import supabase from "@/supabase/supabaseClient";

import { getServerSession } from "next-auth";
import { DestinationType } from "@/helpers/types";

export async function POST(req: NextRequest): Promise<NextResponse> {
  const { dbPayload }: { dbPayload: DestinationType } = await req.json();

  const session = await getServerSession();
  const user = session?.user;

  let trip_id: string = "";

  if (!user) {
    console.error("Not logged in");
    return NextResponse.json({ status: 400 });
  }

  const { data, error } = await supabase
    .from("trip")
    .insert({
      email: user.email,
      destination: dbPayload.name,
      description: dbPayload.description,
      locations: dbPayload.locations,
      bbox: dbPayload.bbox,
      start_date: dbPayload.start_date,
      end_date: dbPayload.end_date,
      created_date: new Date(),
    })
    .select("id");

  if (error) throw error;

  trip_id = data[0].id;

  return NextResponse.json({ status: 200, trip_id: trip_id });
}
