import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function handleFetchLocationList() {
  const session = await getServerSession();
  const user = session?.user;

  if (!user) {
    return NextResponse.json({ status: 400, error: "Not Logged In" });
  }

  try {
    const res = await fetch("http://localhost:3000/api/trip/getUserTrips", {
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
