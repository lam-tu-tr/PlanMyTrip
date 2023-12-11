import { toastError, toastSuccess } from "@/helpers/toast";
import { destType } from "@/helpers/types";

export async function handleSaveToDB(dest: destType) {
  try {
    const res = await fetch("../../../api/trip/saveTrip", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        dbPayload: {
          destName: dest.destName,
          aiMessage: dest.aiMessage,
          destList: dest.destList,
          bbox: dest.bbox,
          startDate: dest.startDate,
          endDate: dest.endDate,
        },
      }),
    });

    if (!res.ok) throw new Error("Failed to save to account");

    const { trip_id } = await res.json();

    // copyToClipboard(tripId);

    // if (type == "save") {
    //   toastSuccess("Trip saved to account and clipboard");
    // } else {
    //   //TODO separate copy to clipboard, if signed in, look for the unique url from database, otherwise, copy the stringparams url.
    //   toastSuccess("Copied to clipboard");
    // }
    return trip_id;
  } catch (error) {
    console.error(error);
    toastError("Couldnt save to database");
  }
}
