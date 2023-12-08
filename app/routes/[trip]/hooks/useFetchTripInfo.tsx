import { toastError } from "@/helpers/toast";
import { destType } from "@/helpers/types";
import React, { useEffect } from "react";

type useFetchTripInfoProp = {
  tripId: string;
  setDest: React.Dispatch<React.SetStateAction<destType>>;
};
export default function useFetchTripInfo({
  tripId,
  setDest,
}: useFetchTripInfoProp) {
  useEffect(() => {
    async function fetchTripInfo() {
      try {
        const res = await fetch("../../api/trip/getTripById", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            dbPayload: tripId,
          }),
        });

        if (!res.ok) throw new Error("Failed to fetch trip by id");

        const { tripInfo } = await res.json();

        if (tripInfo) {
          setDest({
            destName: tripInfo.destination_name,
            bbox: tripInfo.bbox,
            startDate: tripInfo.start_date,
            endDate: tripInfo.end_date,
            aiMessage: tripInfo.ai_response,
            destList: tripInfo.location_list,
            duration: "",
            tripId: tripInfo.id,
          });
        }
      } catch (err) {
        toastError("Couldnt get trip info");
      }
    }

    fetchTripInfo();
  }, [setDest, tripId]);
}
