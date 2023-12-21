import { toastError, toastSuccess } from "@/helpers/toast";
import { DestinationType } from "@/helpers/types";

export async function handleSaveToDB(destination: DestinationType) {
  console.log("db", destination);
  try {
    const res = await fetch("../../../api/trip/saveTrip", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        dbPayload: {
          name: destination.name,
          description: destination.description,
          locations: destination.locations,
          bbox: destination.bbox,
          created_date: new Date().toString(),
          start_date: destination.start_date,
          end_date: destination.end_date,
        },
      }),
    });

    if (!res.ok) throw new Error("Failed to save to account");

    const { trip_id } = await res.json();

    return trip_id;
  } catch (error) {
    console.error(error);
    toastError("Couldnt save to database");
  }
}
