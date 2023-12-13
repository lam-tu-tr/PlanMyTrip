export async function handleDeleteDestination(trip_id: string) {
  console.log("inside delete api");
  try {
    const res = await fetch("http://localhost:3000/api/trip/deleteTripById", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        trip_id: trip_id,
      }),
    });

    if (!res.ok) throw new Error("Failed to delete trip from db");

    return null;
  } catch (err) {
    console.log(err);
  }
}
