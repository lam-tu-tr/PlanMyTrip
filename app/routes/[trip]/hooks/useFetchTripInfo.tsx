import { toastError } from "@/helpers/toast";
import { DestinationType } from "@/helpers/types";
import React, { useEffect } from "react";

type useFetchTripInfoProp = {
  trip_id: string;
  setDestination: React.Dispatch<React.SetStateAction<DestinationType>>;
};
export function useFetchTripInfo({
  trip_id,
  setDestination,
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
            trip_id: trip_id,
          }),
        });

        if (!res.ok) throw new Error("Failed to fetch itinerary by id");

        const { tripData } = await res.json();

        if (tripData) {
          setDestination({
            name: tripData.destination,
            bbox: tripData.bbox,
            description: tripData.description,
            start_date: tripData.start_date,
            end_date: tripData.end_date,
            locations: tripData.locations,
            created_date: tripData.created_date,
            duration: tripData.duration,
            trip_id: tripData.id,
          });
        }
      } catch (err) {
        toastError("Couldnt get trip info");
      }
    }

    fetchTripInfo();
  }, [setDestination, trip_id]);
}
