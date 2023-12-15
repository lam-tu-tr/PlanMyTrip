import { Coordinate, DestinationType } from "@/helpers/types";
import { useEffect, useRef } from "react";
import { handleGetLocationCoordinate } from "../helpers/handleGetLocationCoordinate";
import { handlePromiseAllWithRetries } from "../helpers/handlePromiseAllWithRetries";
import { toastError } from "@/helpers/toast";

export function useFetchLocation(
  aiComplete: boolean,
  setDestination: React.Dispatch<React.SetStateAction<DestinationType>>,
  bbox: string
) {
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    //Select all anchor tags from aiMessage
    //push to destList array the locations found within anchor tag
    const location_arr = document.querySelectorAll(".ai-location");

    const fetchCoordinates = async () => {
      //Create array of promises
      const coordinate_promise_arr: Promise<Coordinate>[] = Array.from(
        location_arr
      ).map((location) => {
        return handleGetLocationCoordinate(location.innerHTML, bbox);
      });

      try {
        const coordinates_arr: Coordinate[] = await handlePromiseAllWithRetries(
          coordinate_promise_arr
        );

        const updatedDestList = coordinates_arr.reduce(
          (prevList, coordinate, index) => {
            const location_name: string = location_arr[index].innerHTML;
            return {
              ...prevList,
              [location_name]: coordinate,
            };
          },
          {}
        );

        setDestination((prev) => ({
          ...prev,
          locations: updatedDestList,
        }));
      } catch (error) {
        console.log("Fetch Coordinate Error", error);
        toastError("Unable to retrieve location coordinates");
      }
    };

    fetchCoordinates();
  }, [aiComplete, bbox, setDestination]);
}
