import { useEffect, useState, useRef } from "react";

import { DestCoordType } from "../helpers/types";

interface MapLoc {
  currLoc: [number, number];
}
export default function Map(currDest: MapLoc) {
  //----------------------------------------------------------------------------------------------------------
  //Map Box Declaration
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

      // Add any additional map configurations or functionality here
      newMap.addControl(new mapboxgl.NavigationControl());
      return () => {
        newMap.remove();
      };
    }
  }, [mapboxgl, mapboxgl.Map]);
  useEffect(() => {
    if (map) {
      map.panTo(currDest.currLoc);
    }
  }, [currDest, map]);
  return <div ref={mapContainerRef} id="map"></div>;
}
