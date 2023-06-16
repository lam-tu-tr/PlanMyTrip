import { useEffect, useState, useRef } from "react";

import { DestCoordType, destType } from "../helpers/types";

import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

interface MapCoord {
  currDest?: [number, number];
  destList?: DestCoordType;
  setDestination: React.Dispatch<React.SetStateAction<destType>>;
}
export default function Map({ currDest, destList, setDestination }: MapCoord) {
  //*Map Box Declaration
  const mapContainerRef = useRef(null);
  const mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");
  mapboxgl.accessToken = process.env.MAPBOX_KEY;
  const [map, setMap] = useState<mapboxgl.Map | null>(null);

  const [destListFilled, setDestListFilled] = useState(false);

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
        center: [-79.2, 21.945],
        zoom: 1.5,
        pitch: 0,
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
    if (map && Object.getOwnPropertyNames(destList).length !== 0) {
      map.easeTo({
        center: currDest,
        zoom: 10,

        pitch: 30,
      });
    }
  }, [map, mapboxgl.Marker, destList, destListFilled]);

  console.log(destList);
  //*Fly animation to destination when hovering over destination name
  useEffect(() => {
    if (map) {
      setTimeout(() => {
        // map.flyTo({
        //   center: currDest,
        //   essential: true,
        //   maxDuration: 3000,

        //   curve: 1.5,
        // });
        if (map && Object.getOwnPropertyNames(destList)?.length !== 0) {
          map.easeTo({
            center: currDest,
            zoom: 10,

            pitch: 30,
          });
        }
        // map.setZoom(4),
      }, 100);
    }
  }, [currDest, map, destListFilled]);
  return (
    <div id="map">
      <div ref={mapContainerRef} className=""></div>
    </div>
  );
}
