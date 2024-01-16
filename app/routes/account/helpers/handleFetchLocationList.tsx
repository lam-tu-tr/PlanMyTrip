import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { User } from "@supabase/supabase-js";

export async function handleFetchLocationList({ user }: { user: User }) {
  // const session = await getServerSession();
  // const user = session?.user;

  const proto = headers().get("x-forwarded-proto");
  const host = headers().get("x-forwarded-host");
  const baseUrl = `${proto}://${host}`;

  if (!user || !baseUrl) {
    return NextResponse.json({ status: 400, error: "Not Logged In" });
  }

  try {
    const res = await fetch(`${baseUrl}/api/trip/getUserTrips`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_email: user.email,
      }),
    });

    if (!res.ok) throw new Error("Failed to get itinerary list from db");

    const { cardItineraryList } = await res.json();

    return cardItineraryList;
  } catch (err) {
    console.log(err);
  }
}
