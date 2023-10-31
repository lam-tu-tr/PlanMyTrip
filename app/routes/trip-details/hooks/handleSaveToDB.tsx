//*Handle Save to db

import { toastError, toastSuccess } from "@/helpers/toast";
import { destType } from "@/helpers/types";

async function copyToClipboard(tripId: string) {
  try {
    await navigator.clipboard.writeText(
      `${window.location.href}/routes/tripId?tripId=${tripId}`
    );
  } catch (err) {
    toastError("Failed to copy to clipboard, please try again");
  }
}

export default async function handleSaveToDB(
  type: string,
  dest: destType,
  currentUser: string | null
) {
  if (currentUser == null) {
    toastError("Please log in to enable trip saving and sharing");
    return;
  }

  try {
    const res = await fetch("../../../api/trip", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        dbPayload: {
          username: currentUser,
          destName: dest.destName,
          aiMessage: dest.aiMessage,
          destList: dest.destList,
          bbox: dest.bbox,
          startDate: dest.startDate,
          endDate: dest.endDate,
        },
        type: "create",
      }),
    });

    if (!res.ok) throw new Error("Failed to save to account");

    const { tripId } = await res.json();

    copyToClipboard(tripId);
    if (type == "save") {
      toastSuccess("Trip saved to account and clipboard");
      // router.push(`/routes/tripId?tripId=${tripId}`);
    } else {
      //TODO separate copy to clipboard, if signed in, look for the unique url from database, otherwise, copy the stringparams url.
      toastSuccess("Copied to clipboard");
    }
  } catch (err) {
    toastError("Couldnt copy to clipboard");
  }
}
