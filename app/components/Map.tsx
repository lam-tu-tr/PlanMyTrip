import { useEffect, useState, useRef } from "react";

import { DestCoordType, destType } from "../helpers/types";

import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

interface MapCoord {
  currDest?: [number, number];
  destList?: DestCoordType;
  initialCoord?: [number, number];
  setDestination: React.Dispatch<React.SetStateAction<destType>>;
}
export default function Map({
  currDest,
  destList,
  initialCoord,
  setDestination,
}: MapCoord) {
  //*Map Box Declaration
  const mapContainerRef = useRef(null);
  const mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");
  require("mapbox-gl/dist/mapbox-gl.css");
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

  useEffect(() => {
    console.log("changing maps");
    if (map && destList && Object.getOwnPropertyNames(destList).length > 0) {
      const bounds = new mapboxgl.LngLatBounds();
      const markers: any = [];
      //*Loop through destList and set a marker for each destination, and pushing
      //*marker into markers array
      Object.keys(destList).forEach((key) => {
        const value = destList[key];

        markers.push(
          new mapboxgl.Marker({
            color: `#${Math.random()
              .toString(16)
              .slice(2, 8)
              .padStart(6, "0")}`,
          })
            .setLngLat(value)
            .setPopup(new mapboxgl.Popup().setHTML(`${key}`))
            .addTo(map)
        );

        //* iterate through makers and get the boundary box
        markers.forEach((marker: any) => {
          bounds.extend(marker.getLngLat());
        });

        //*animate zoom & pan to bound box
        map.fitBounds(bounds, {
          padding: 50,
          maxZoom: 10,
          pitch: 50,
        });
      });
    }
    // console.log("currDst: " + currDest);
    // console.log("initial: " + initialCoord);
  }, [destList, map, mapboxgl.LngLatBounds, mapboxgl.Marker, mapboxgl.Popup]);

  useEffect(() => {
    if (map && JSON.stringify(currDest) !== JSON.stringify(initialCoord)) {
      setTimeout(() => {
        map.flyTo({
          center: currDest,
          zoom: 12,
          curve: 1.8,
          speed: 1.2,
          pitch: 50,
          easing(t) {
            return t;
          },
        });
      }, 100);
    }
  }, [currDest, initialCoord, map]);
  return (
    <div id="map">
      <div ref={mapContainerRef} className=""></div>
    </div>
  );
}
