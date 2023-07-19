import { useEffect, useState, useRef, useMemo } from "react";
import { DestCoordType, destType } from "../helpers/types";

import { useGlobalContext } from "@/app/Context";
import { toastError } from "../helpers/toast";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
(mapboxgl as any).accessToken = process.env.MAPBOX_KEY;

interface MapCoord {
  currDest?: [number, number];
  destList?: DestCoordType;
  initialCoord?: [number, number];
  dest: destType;
  setDest: React.Dispatch<React.SetStateAction<destType>>;
}
export default function Map({
  currDest,
  initialCoord,
  dest,
  setDest,
}: MapCoord) {
  //*Map Box Declaration
  const mapContainerRef = useRef(null);

  const [map, setMap] = useState<mapboxgl.Map | null>(null);

  const [markers, setMarkers] = useState<any[]>([]);

  const { isMobile } = useGlobalContext();

  //* Create the map
  useEffect(() => {
    //mapbox variable
    if (!mapboxgl.supported()) {
      toastError("Interactive Map is not supported in this browser");
      return;
    }
    //if there is a map Ref found, create new map
    if (mapContainerRef.current) {
      const newMap = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [-79.2, 21.945],
        zoom: 1.5,
        pitch: 0,
      });
      newMap.on("load", () => {
        setMap(newMap);
      });

      newMap.addControl(new mapboxgl.NavigationControl(), "top-left");

      const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        placeholder: "Choose a destination",
        zoom: 9,
      });
      newMap.addControl(geocoder);

      geocoder.on("result", (event) => {
        setDest((prevState: any) => ({
          ...prevState,
          destName: event.result.place_name,
          bbox: event.result.bbox.toString(),
        }));
      });

      return () => {
        newMap.remove();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapboxgl, mapboxgl.Map, setDest, isMobile]);

  //* Add markers to map
  useEffect(() => {
    if (
      map &&
      dest.destList &&
      Object.getOwnPropertyNames(dest.destList).length > 0
    ) {
      //*Loop through dest.destList and set a marker for each destination, and pushing
      //*marker into markers array
      Object.keys(dest.destList).forEach((key) => {
        const value = dest.destList[key];
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
      dest.destList &&
      Object.getOwnPropertyNames(dest.destList).length == 0
    ) {
      markers.forEach((marker) => {
        marker.remove();
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    dest.destList,
    map,
    mapboxgl.LngLatBounds,
    mapboxgl.Marker,
    mapboxgl.Popup,
  ]);

  // //* iterate through makers and get the boundary box
  const bounds = useMemo(() => {
    const newBounds = new mapboxgl.LngLatBounds();

    if (markers.length === 0) {
      return null; // Return null if there are no markers
    }
    markers.forEach((marker) => {
      newBounds.extend(marker.getLngLat());
    });

    console.log(newBounds);
    return newBounds;
  }, [mapboxgl.LngLatBounds, markers]);

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
  return (
    <>
      <div ref={mapContainerRef} id="map"></div>
    </>
  );
}
