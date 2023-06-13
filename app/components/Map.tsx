import { useEffect, useState, useRef } from "react";

import { DestCoordType } from "../helpers/types";

import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

interface MapCoord {
  currDest: [number, number];
  destList: DestCoordType;
}
export default function Map({ currDest, destList }: MapCoord) {
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
        center: [-117.16, 32.71],
        zoom: 12,
        pitch: 60,
      });
      newMap.on("load", () => {
        setMap(newMap);
      });

      //*TODO Add any additional map configurations or functionality here

      newMap.addControl(new mapboxgl.NavigationControl());

      newMap.addControl(
        new MapboxGeocoder({
          accessToken: mapboxgl.accessToken,
          mapboxgl: mapboxgl,
        })
      );
      return () => {
        newMap.remove();
      };
    }
  }, [mapboxgl, mapboxgl.Map]);

  useEffect(() => {
    Object.keys(destList).forEach((key) => {
      const value = destList[key];
      console.log("key: " + key + "value: " + value);
      new mapboxgl.Marker().setLngLat(value).addTo(map);
    });
  }, [map, mapboxgl.Marker, destList]);

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
        200
      );
    }
  }, [currDest, map, mapboxgl.Marker]);
  return (
    <div id="map">
      <div ref={mapContainerRef}></div>
      <div id="menu"></div>
    </div>
  );
}
