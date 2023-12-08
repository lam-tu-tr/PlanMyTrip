import { NextRequest, NextResponse } from "next/server";
import supabase from "@/supabase/supabaseClient";

export async function POST(req: NextRequest): Promise<NextResponse> {
  const { dbPayload } = await req.json();

  let tripInfo = [];

  const { data, error } = await supabase
    .from("trip")
    .select("*")
    .eq("id", dbPayload);

  if (error) return NextResponse.json({ status: 400, error: error });
  tripInfo = data[0];

  return NextResponse.json({ status: 200, tripInfo: tripInfo });
}
