import { NextRequest, NextResponse } from "next/server";
import supabase from "@/supabase/supabaseClient";

export async function POST(req: NextRequest): Promise<NextResponse> {
  console.log("deleting");
  const { trip_id } = await req.json();

  const { error } = await supabase.from("trip").delete().eq("id", trip_id);

  if (error) return NextResponse.json({ status: 400, error: error });

  return NextResponse.json({ status: 200 });
}
