import { toastError } from "@/helpers/toast";
import { DestinationType } from "@/helpers/types";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import mapboxgl from "mapbox-gl";
import { Dispatch, MutableRefObject, SetStateAction, useEffect } from "react";

type CreateMapType = {
  mapContainerRef: MutableRefObject<null>;
  setMap: Dispatch<SetStateAction<mapboxgl.Map | null>>;
  setDestination: Dispatch<SetStateAction<DestinationType>>;
  geocoder_visible: boolean;
};
export function useCreateMap({
  mapContainerRef,
  setMap,
  setDestination,
  geocoder_visible,
}: CreateMapType) {
  //* Create the map
  useEffect(() => {
    if (!mapboxgl.supported()) {
      toastError("Interactive Map is not supported in this browser");
      return;
    }
    //*if there is a map Ref found, create new map
    if (mapContainerRef.current) {
      const newMap = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/dark-v11",
        center: [-79.2, 21.945],
        zoom: 1.5,
        pitch: 0,
      });
      newMap.on("load", () => {
        setMap(newMap);
      });

      newMap.addControl(new mapboxgl.NavigationControl(), "bottom-right");

      if (geocoder_visible === true) {
        handleGeoCoder(newMap, setDestination);
      }

      return () => {
        newMap.remove();
      };
    }
  }, [geocoder_visible, mapContainerRef, setDestination, setMap]);
}
function handleGeoCoder(
  newMap: mapboxgl.Map,
  setDestination: Dispatch<SetStateAction<DestinationType>>
) {
  const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
    placeholder: "Choose a destination",
    zoom: 9,
  });

  newMap.addControl(geocoder);

  geocoder.on("result", (event) => {
    setDestination((prevState: any) => ({
      ...prevState,
      name: event.result.place_name,
      bbox: event.result.bbox.toString(),
    }));
  });
}
