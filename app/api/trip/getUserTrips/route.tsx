import { NextRequest, NextResponse } from "next/server";
import supabase from "@/supabase/supabaseClient";
import { getServerSession } from "next-auth";

export async function GET(req: NextRequest): Promise<NextResponse> {
  const session = await getServerSession();
  const user = session?.user;

  if (!user) {
    return NextResponse.json({ status: 400, error: "Not Logged In" });
  }

  //TODO Create type for server tripInfo
  let tripInfo = [];

  const { data, error } = await supabase
    .from("trip")
    .select("id, destination_name, bbox, start_date, end_date, created_date")
    .eq("email", user.email)
    .order("created_date", { ascending: false });

  if (error) return NextResponse.json({ status: 400, error: error });

  tripInfo = data;

  return NextResponse.json({ status: 200, tripInfo: tripInfo });
}
