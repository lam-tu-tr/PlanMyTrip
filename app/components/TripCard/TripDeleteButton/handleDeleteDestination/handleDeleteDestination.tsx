"use server";

import { headers } from "next/headers";

export async function handleDeleteDestination(trip_id: string) {
  const proto = headers().get("x-forwarded-proto");
  const host = headers().get("x-forwarded-host");
  const baseUrl = `${proto}://${host}`;

  try {
    const res = await fetch(`${baseUrl}/api/trip/deleteTripById`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        trip_id: trip_id,
      }),
    });

    if (!res.ok) {
      return false;
      // throw new Error("Failed to delete trip from db");
    }
    return true;
  } catch (err) {
    console.log(err);
  }
}
