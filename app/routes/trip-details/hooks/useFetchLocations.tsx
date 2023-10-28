import { destType } from "@/helpers/types";
import { useEffect } from "react";

export default function useFetchLocation(
  aiComplete: boolean,
  setDest: React.Dispatch<React.SetStateAction<destType>>,
  bbox: string
) {
  //*
  //*Select all anchor tags from aiMessage and assign mouseover event
  //*push to destList array the locations found
  useEffect(() => {
    const allLocations = document.querySelectorAll(".ai-location");
    //*
    //*Unit Function to obtain specific destination coordinate */
    //*Called multiple times in fetchCoordinate()
    async function getCoord(location: string) {
      const destRes = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?bbox=${bbox}&limit=2&access_token=${process.env.MAPBOX_KEY}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!destRes.ok) {
        throw new Error(`Failed to fetch ${location} coordinate`);
      }
      const destCoord = await destRes.json();
      const x = destCoord.features[0].center[0];
      const y = destCoord.features[0].center[1];
      return { x, y };
    }

    //*Fetch data from Mapbox geo data to get coordinates for all destinations
    //*assign destination as key and coordinates as values for destList
    //*
    const fetchCoordinates = async () => {
      const coordinatePromises = Array.from(allLocations).map((location) => {
        return getCoord(location.innerHTML);
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
