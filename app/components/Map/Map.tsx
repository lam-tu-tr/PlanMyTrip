import { useState, useRef } from "react";

import { DestinationType, MarkerType } from "@/helpers/types";

import mapboxgl, { LngLatLike } from "mapbox-gl";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "mapbox-gl/dist/mapbox-gl.css";

import { useCreateMap } from "./hooks/useCreateMap";
import { useAddMarkers } from "./hooks/useAddMarkers";
import { useHandleBoundAndHover } from "./hooks/useHandleBoundAndHover";
(mapboxgl as any).accessToken = process.env.MAPBOX_KEY;

import "./Map.scss";

interface MapCoord {
  currDest?: LngLatLike;
  initialCoord?: [number, number];
  destination: DestinationType;
  setDestination: React.Dispatch<React.SetStateAction<DestinationType>>;
  geocoder_visible: boolean;
}
export function Map({
  currDest,
  initialCoord,
  destination,
  setDestination,
  geocoder_visible,
}: MapCoord) {
  const [map, setMap] = useState<mapboxgl.Map | null>(null);

  const [markers, setMarkers] = useState<MarkerType[]>([]);

  useCreateMap({ setMap, setDestination, geocoder_visible });

  useAddMarkers({ map, locations: destination.locations, markers, setMarkers });

  useHandleBoundAndHover({ markers, map, currDest, initialCoord });

  return <div id="map"></div>;
}
