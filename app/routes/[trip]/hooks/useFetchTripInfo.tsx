import { toastError } from "@/helpers/toast";
import { destType } from "@/helpers/types";
import React, { useEffect } from "react";

type useFetchTripInfoProp = {
  tripId: string;
  setDest: React.Dispatch<React.SetStateAction<destType>>;
};
export function useFetchTripInfo({ tripId, setDest }: useFetchTripInfoProp) {
  useEffect(() => {
    async function fetchTripInfo() {
      try {
        const res = await fetch("../../api/trip/getTripById", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            trip_id: tripId,
          }),
        });

        if (!res.ok) throw new Error("Failed to fetch itinerary by id");

        const { tripData } = await res.json();

        if (tripData) {
          setDest({
            destName: tripData.destination_name,
            bbox: tripData.bbox,
            startDate: tripData.start_date,
            endDate: tripData.end_date,
            aiMessage: tripData.ai_response,
            destList: tripData.location_list,
            duration: "",
            tripId: tripData.id,
          });
        }
      } catch (err) {
        toastError("Couldnt get trip info");
      }
    }

    fetchTripInfo();
  }, [setDest, tripId]);
}
