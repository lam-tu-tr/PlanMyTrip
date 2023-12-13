import { toastError, toastSuccess } from "@/helpers/toast";
import { DestinationType } from "@/helpers/types";

export async function handleSaveToDB(destination: DestinationType) {
  try {
    const res = await fetch("../../../api/trip/saveTrip", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        dbPayload: {
          name: destination.name,
          aiMessage: destination.aiMessage,
          location_list: destination.location_list,
          bbox: destination.bbox,
          start_date: destination.start_date,
          end_date: destination.end_date,
        },
      }),
    });

    if (!res.ok) throw new Error("Failed to save to account");

    const { trip_id } = await res.json();

    //   //TODO separate copy to clipboard, if signed in, look for the unique url from database, otherwise, copy the stringparams url.
    return trip_id;
  } catch (error) {
    console.error(error);
    toastError("Couldnt save to database");
  }
}
