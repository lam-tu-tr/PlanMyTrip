import { LocationDateType, LocationType, MarkerType } from "@/helpers/types";
import mapboxgl, { Marker, LngLatLike } from "mapbox-gl";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";

type AddMarkersType = {
  map: mapboxgl.Map | null;
  locations: LocationDateType;
  markers: MarkerType[];
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
          const { marker } = createMarkerAndStyle(
            info.coordinate,
            info.emoji,
            date_color
          );

          new mapboxgl.Marker(marker.element)
            .setLngLat(info.coordinate)
            .setPopup(new mapboxgl.Popup().setHTML(`${location}`))
            .addTo(map);

          setMarkers((prev) => [...prev, marker]);
        });
      });
    } else if (
      map &&
      locations &&
      Object.getOwnPropertyNames(locations).length == 0
    ) {
      markers.forEach((marker) => {
        marker.element.remove();
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locations, mapboxgl.LngLatBounds, mapboxgl.Marker, mapboxgl.Popup]);
}

function getRandomColor() {
  const hue = Math.floor(Math.random() * 360);

  // Set lower saturation and brightness for muted colors
  const saturation = Math.floor(Math.random() * 30) + 20;
  const lightness = Math.floor(Math.random() * 30) + 50;

  const rgbColor = `hsl(${hue},${saturation}%,${lightness}%)`;

  return rgbColor;
}

function createMarkerAndStyle(
  coordinate: LngLatLike,
  emoji: string,
  color: string
) {
  const marker: MarkerType = {
    coordinate: coordinate,
    element: document.createElement("div"),
  };

  marker.element.className = "marker";
  marker.element.style.backgroundColor = color;
  marker.element.textContent = emoji;

  return { marker };
}
