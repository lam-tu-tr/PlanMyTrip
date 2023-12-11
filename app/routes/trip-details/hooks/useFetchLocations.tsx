import { destType } from "@/helpers/types";
import { useEffect } from "react";
import { handleGetLocationCoordinate } from "../helpers/handleGetLocationCoordinate";

export function useFetchLocation(
  aiComplete: boolean,
  setDest: React.Dispatch<React.SetStateAction<destType>>,
  bbox: string
) {
  //*
  //*Select all anchor tags from aiMessage
  //*push to destList array the locations found within anchor tag
  //*
  useEffect(() => {
    const allLocations = document.querySelectorAll(".ai-location");

    //*Fetch data from Mapbox geo data to get coordinates for all destinations
    //*assign destination as key and coordinates as values for destList
    //*
    const fetchCoordinates = async () => {
      const coordinatePromises = Array.from(allLocations).map((location) => {
        return handleGetLocationCoordinate(location.innerHTML, bbox);
      });

      try {
        const coordinates = await Promise.all(coordinatePromises);
        const updatedDestList = coordinates.reduce(
          (prevList, coordinate, index) => {
            const location = allLocations[index].innerHTML;
            return {
              ...prevList,
              [location]: [coordinate.x, coordinate.y],
            };
          },
          {}
        );
        setDest((prev) => ({
          ...prev,
          destList: updatedDestList,
        }));
      } catch (err) {
        console.log("Fetch Coordinate Erorr", err);
      }
    };

    fetchCoordinates();
  }, [aiComplete, bbox, setDest]);
}
