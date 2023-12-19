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
      //*Loop through locations and set a marker for each destination, and pushing
      //*marker into markers array
      Object.values(locations).forEach((date) => {
        const date_color = getRandomColor();

        Object.entries(date).forEach(([location, info], index) => {
          const { marker } = createMarkerAndStyle(info.emoji, date_color);

          new mapboxgl.Marker(marker)
            .setLngLat(info.coordinate)
            .setPopup(new mapboxgl.Popup().setHTML(`${location}`))
            .addTo(map);
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

function getRandomColor() {
  // return `#${Math.random().toString(16).slice(2, 8).padStart(6, "0")}`;
  // Generate a random hue value
  const hue = Math.floor(Math.random() * 360);

  // Set lower saturation and brightness for muted colors
  const saturation = Math.floor(Math.random() * 30) + 20; // Adjust the range as needed
  const lightness = Math.floor(Math.random() * 30) + 50; // Adjust the range as needed

  // Convert HSL to RGB
  const rgbColor = `hsl(${hue},${saturation}%,${lightness}%)`;

  return rgbColor;
}

function createMarkerAndStyle(emoji: string, color: string) {
  const marker = document.createElement("div");

  marker.className = "marker";
  marker.style.backgroundColor = color;
  marker.textContent = emoji;

  return { marker };
}
