import { useEffect, useState, useRef } from "react";

const MAPBOX_API_KEY =
  "pk.eyJ1IjoibGFtaXNtIiwiYSI6ImNsaWR5eGVwNzBldjYza3Q4amJudHVhMWEifQ.WEc1LP70RJIxLj3ss0H1sQ";

interface MapLoc {
  currLoc: [number, number];
}
export default function Map(currLoc: MapLoc) {
  //----------------------------------------------------------------------------------------------------------
  //Map Box Declaration
  const mapContainerRef = useRef(null);
  const mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");
  mapboxgl.accessToken = MAPBOX_API_KEY;
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

      return () => {
        newMap.remove();
      };
    }
  }, [mapboxgl, mapboxgl.Map]);
  useEffect(() => {
    if (map) {
      map.panTo(currLoc.currLoc);
    }
  }, [currLoc, map]);
  return (
    <div ref={mapContainerRef} id="map" className="z-30">
      <h1 className="z-50 text-4xl text-blue-50">Change location</h1>
      <div></div>
    </div>
  );
}
