import { useState, useRef } from "react";

import { DestinationType } from "@/helpers/types";

import mapboxgl from "mapbox-gl";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "mapbox-gl/dist/mapbox-gl.css";

import { useCreateMap } from "./hooks/useCreateMap";
import { useAddMarkers } from "./hooks/useAddMarkers";
import { useHandleBoundAndHover } from "./hooks/useHandleBoundAndHover";
(mapboxgl as any).accessToken = process.env.MAPBOX_KEY;

import { Marker } from "mapbox-gl";
import "./Map.scss";

interface MapCoord {
  currDest?: [number, number];
  initialCoord?: [number, number];
  destination: DestinationType;
  setDestination: React.Dispatch<React.SetStateAction<DestinationType>>;
}
export function Map({
  currDest,
  initialCoord,
  destination,
  setDestination,
}: MapCoord) {
  const mapContainerRef = useRef(null);

  const [map, setMap] = useState<mapboxgl.Map | null>(null);

  const [markers, setMarkers] = useState<Marker[]>([]);

  console.log("markers", markers);
  useCreateMap({ mapContainerRef, setMap, setDestination });

  useAddMarkers({ map, locations: destination.locations, markers, setMarkers });

  useHandleBoundAndHover({ markers, map, currDest, initialCoord });

  return <div ref={mapContainerRef} id="map"></div>;
}
