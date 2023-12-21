"use server";

import { revalidatePath } from "next/cache";

export async function handleDeleteDestination(trip_id: string) {
  try {
    const res = await fetch("/api/trip/deleteTripById", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        trip_id: trip_id,
      }),
    });

    if (!res.ok) throw new Error("Failed to delete trip from db");
    revalidatePath("/routes/account");
  } catch (err) {
    console.log(err);
  }
}
