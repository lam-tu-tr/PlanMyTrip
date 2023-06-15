import { useEffect, useState, useRef } from "react";

import { DestCoordType, destType } from "../helpers/types";

import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

interface MapCoord {
  currDest?: [number, number];
  destList?: DestCoordType;
  destination?: string;
  setDestination: React.Dispatch<React.SetStateAction<destType>>;
}
export default function Map({ currDest, destList, setDestination }: MapCoord) {
  //*Map Box Declaration
  const mapContainerRef = useRef(null);
  const mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");
  mapboxgl.accessToken = process.env.MAPBOX_KEY;
  const [map, setMap] = useState<mapboxgl.Map | null>(null);

  useEffect(() => {
    //mapbox variable
    if (!mapboxgl.supported()) {
      // Mapbox GL not supported on the current browser
      console.error("Mapbox GL is not supported in this browser");
      return;
    }
    //if there is a map Ref found, create new map
    if (mapContainerRef.current) {
      const newMap = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: currDest || [-117.16, 32.71],
        zoom: 12,
        pitch: 60,
      });
      newMap.on("load", () => {
        setMap(newMap);
      });

      //*TODO Add any additional map configurations or functionality here

      newMap.addControl(new mapboxgl.NavigationControl(), "top-left");

      const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        placeholder: "Choose a destination",
        zoom: 9,
      });
      newMap.addControl(geocoder);

      geocoder.on("result", (event) => {
        // console.log(event.result);
        setDestination({
          name: event.result.place_name,
          x: event.result.center[0],
          y: event.result.center[1],
        });
      });

      return () => {
        newMap.remove();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapboxgl, mapboxgl.Map, setDestination]);

  //*Loop through destList and set a marker for each destination
  useEffect(() => {
    if (destList) {
      Object.keys(destList).forEach((key) => {
        const value = destList[key];
        console.log("key: " + key + "value: " + value);
        new mapboxgl.Marker().setLngLat(value).addTo(map);
      });
    }
  }, [map, mapboxgl.Marker, destList]);

  //*Fly animation to destination when hovering over destination name
  useEffect(() => {
    if (map) {
      setTimeout(
        () =>
          map.flyTo({
            center: currDest,
            essential: true,
            maxDuration: 3000,
            curve: 1.5,
          }),
        100
      );
    }
  }, [currDest, map]);
  return (
    <div id="map">
      <div ref={mapContainerRef}></div>
    </div>
  );
}
