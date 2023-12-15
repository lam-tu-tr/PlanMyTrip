import { DestinationType } from "@/helpers/types";
import mapboxgl from "mapbox-gl";
import { Dispatch, SetStateAction, useEffect } from "react";

type AddMarkersType = {
  map: mapboxgl.Map | null;
  destination: DestinationType;
  markers: any[];
  setMarkers: Dispatch<SetStateAction<any[]>>;
};

export function useAddMarkers({
  map,
  destination,
  markers,
  setMarkers,
}: AddMarkersType) {
  //* Add markers to map
  useEffect(() => {
    if (
      map &&
      destination.locations &&
      Object.getOwnPropertyNames(destination.locations).length > 0
    ) {
      //*Loop through dest.destList and set a marker for each destination, and pushing
      //*marker into markers array
      Object.keys(destination.locations).forEach((key) => {
        const value = destination.locations[key];
        setMarkers((prev) => [
          ...prev,
          new mapboxgl.Marker({
            color: `#${Math.random()
              .toString(16)
              .slice(2, 8)
              .padStart(6, "0")}`,
          })
            .setLngLat(value)
            .setPopup(new mapboxgl.Popup().setHTML(`${key}`))
            .addTo(map),
        ]);
      });
    } else if (
      map &&
      destination.locations &&
      Object.getOwnPropertyNames(destination.locations).length == 0
    ) {
      markers.forEach((marker) => {
        marker.remove();
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    destination,
    map,
    mapboxgl.LngLatBounds,
    mapboxgl.Marker,
    mapboxgl.Popup,
  ]);
}
