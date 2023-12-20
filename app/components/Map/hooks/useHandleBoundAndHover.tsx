import { MarkerType } from "@/helpers/types";
import mapboxgl from "mapbox-gl";
import { useEffect, useMemo } from "react";

type HandleBoundAndHoverType = {
  markers: MarkerType[];
  map: mapboxgl.Map | null;
  currDest: [number, number] | undefined;
  initialCoord: [number, number] | undefined;
};
export function useHandleBoundAndHover({
  markers,
  map,
  currDest,
  initialCoord,
}: HandleBoundAndHoverType) {
  // //* iterate through markers and get the boundary box

  const bounds = useMemo(() => {
    if (markers.length === 0) {
      return null;
    }
    const newBounds = new mapboxgl.LngLatBounds();

    markers.forEach((marker) => {
      newBounds.extend(marker.coordinate);
    });

    return newBounds;
  }, [markers]);

  useEffect(() => {
    // //*animate zoom & pan to bound box
    if (map && bounds) {
      map.fitBounds(bounds, {
        padding: 100,
        maxZoom: 13,
        pitch: 0,
      });
    }
  }, [bounds, map]);

  //* Move to a destination on hovering destination name link
  useEffect(() => {
    if (map && JSON.stringify(currDest) !== JSON.stringify(initialCoord)) {
      setTimeout(() => {
        map.flyTo({
          center: currDest,
          zoom: 14,
          curve: 1.8,
          speed: 1.5,
          pitch: 50,
          easing(t) {
            return t;
          },
        });
      }, 100);
    }
  }, [currDest, initialCoord, map]);
}
