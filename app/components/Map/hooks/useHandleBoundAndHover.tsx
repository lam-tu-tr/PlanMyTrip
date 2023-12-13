import mapboxgl from "mapbox-gl";
import React, { useEffect, useMemo } from "react";

type HandleBoundAndHoverType = {
  markers: any[];
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
  // //* iterate through makers and get the boundary box
  const bounds = useMemo(() => {
    const newBounds = new mapboxgl.LngLatBounds();

    if (markers.length === 0) {
      return null; // Return null if there are no markers
    }
    markers.forEach((marker) => {
      newBounds.extend(marker.getLngLat());
    });

    return newBounds;
  }, [markers]);

  useEffect(() => {
    // //*animate zoom & pan to bound box
    if (map && bounds) {
      map.fitBounds(bounds, {
        padding: 50,
        maxZoom: 10,
        pitch: 50,
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
