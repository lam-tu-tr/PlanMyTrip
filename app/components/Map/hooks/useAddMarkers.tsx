import { LocationDateType, LocationType } from "@/helpers/types";
import mapboxgl, { Marker, LngLatLike } from "mapbox-gl";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";

type AddMarkersType = {
  map: mapboxgl.Map | null;
  locations: LocationDateType;
  markers: Marker[];
  setMarkers: Dispatch<SetStateAction<any[]>>;
};

export function useAddMarkers({
  map,
  locations,
  markers,
  setMarkers,
}: AddMarkersType) {
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (
      map &&
      locations &&
      Object.getOwnPropertyNames(locations).length > 0 &&
      markers.length == 0
    ) {
      console.log("locations", locations);
      //*Loop through locations and set a marker for each destination, and pushing
      //*marker into markers array
      Object.values(locations).forEach((date) => {
        Object.entries(date).forEach(([location, info], index) => {
          console.log(info.coordinate);
          setMarkers((prev: Marker[]) => [
            ...prev,
            new mapboxgl.Marker({
              color: `#${Math.random()
                .toString(16)
                .slice(2, 8)
                .padStart(6, "0")}`,
            })
              .setLngLat(info.coordinate)
              .setPopup(new mapboxgl.Popup().setHTML(`${location}`))
              .addTo(map),
          ]);
        });
      });
    } else if (
      map &&
      locations &&
      Object.getOwnPropertyNames(locations).length == 0
    ) {
      markers.forEach((marker) => {
        marker.remove();
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locations, mapboxgl.LngLatBounds, mapboxgl.Marker, mapboxgl.Popup]);
}
