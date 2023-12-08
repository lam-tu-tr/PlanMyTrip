import { NextRequest, NextResponse } from "next/server";
import supabase from "@/supabase/supabaseClient";

import { getServerSession } from "next-auth";

export async function POST(req: NextRequest): Promise<NextResponse> {
  const { dbPayload } = await req.json();
  const session = await getServerSession();
  const user = session?.user;

  let res = "";
  let tripInfo;

  if (!user) {
    console.error("Not logged in");
    return NextResponse.json({ status: 400 });
  }

  const { error } = await supabase.from("trip").insert({
    email: user.email,
    destination_name: dbPayload.destName,
    ai_response: dbPayload.aiMessage,
    location_list: dbPayload.destList,
    bbox: dbPayload.bbox,
    start_date: dbPayload.startDate,
    end_date: dbPayload.endDate,
    created_date: new Date(),
  });
  if (error) throw error;

  return NextResponse.json({ status: 200, tripId: res, tripInfo: tripInfo });
}
