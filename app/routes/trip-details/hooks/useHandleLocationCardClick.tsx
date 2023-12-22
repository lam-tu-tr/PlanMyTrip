import { LocationDateType, LocationType } from "@/helpers/types";
import { LngLatLike } from "mapbox-gl";
import { useEffect } from "react";

//** add event delegation, location_card class on click bubbles up to itinerary_container class*/
export function useHandleLocationCardClick(
  locations_dates: LocationDateType,
  setCurrDest: React.Dispatch<React.SetStateAction<LngLatLike | undefined>>
) {
  useEffect(() => {
    const itinerary_container = document.querySelector(".itinerary_container");

    const handleHoverEvent = (event: any) => {
      const card = event.target.closest(".location_card");

      if (card) {
        const card_location = card.querySelector("h3").textContent;

        Object.values(locations_dates).forEach((locations: LocationType) => {
          Object.keys(locations).forEach((location_name: string) => {
            if (location_name == card_location) {
              setCurrDest(locations[card_location].coordinate);
            }
          });
        });
      }
    };

    itinerary_container!.addEventListener("click", handleHoverEvent);

    return () => {
      itinerary_container!.removeEventListener("click", handleHoverEvent);
    };
  }, [locations_dates, setCurrDest]);
}
