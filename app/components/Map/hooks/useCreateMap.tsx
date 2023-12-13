import { toastError } from "@/helpers/toast";
import { DestinationType } from "@/helpers/types";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import mapboxgl from "mapbox-gl";
import { Dispatch, MutableRefObject, SetStateAction, useEffect } from "react";

type CreateMapType = {
  mapContainerRef: MutableRefObject<null>;
  setMap: Dispatch<SetStateAction<mapboxgl.Map | null>>;
  setDestination: Dispatch<SetStateAction<DestinationType>>;
};
export function useCreateMap({
  mapContainerRef,
  setMap,
  setDestination,
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
        setDestination((prevState: any) => ({
          ...prevState,
          name: event.result.place_name,
          bbox: event.result.bbox.toString(),
        }));
      });

      return () => {
        newMap.remove();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapboxgl, mapboxgl.Map, setDestination]);
}
