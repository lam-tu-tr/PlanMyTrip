import { NextRequest, NextResponse } from "next/server";
import supabase from "@/supabase/supabaseClient";
import { getServerSession } from "next-auth";

export async function POST(req: NextRequest): Promise<NextResponse> {
  const { user_email } = await req.json();
  // const user_email = req.body;
  console.log("user_email", user_email);
  //TODO Create type for server tripInfo
  let tripInfo = [];

  const { data, error } = await supabase
    .from("trip")
    .select("id, destination_name, bbox, start_date, end_date, created_date")
    .eq("email", user_email)
    .order("created_date", { ascending: false });

  if (error) return NextResponse.json({ status: 400, error: error });

  // console.log("tripData", data);
  tripInfo = data;

  return NextResponse.json({ status: 200, tripInfo: tripInfo });
}
