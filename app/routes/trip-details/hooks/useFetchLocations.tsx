import { Coordinate, destType } from "@/helpers/types";
import { useEffect, useRef } from "react";
import { handleGetLocationCoordinate } from "../helpers/handleGetLocationCoordinate";
import { handlePromiseAllWithRetries } from "../helpers/handlePromiseAllWithRetries";

export function useFetchLocation(
  aiComplete: boolean,
  setDest: React.Dispatch<React.SetStateAction<destType>>,
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
        console.log("trying promiseall");
        const coordinates_arr: Coordinate[] = await handlePromiseAllWithRetries(
          coordinate_promise_arr
        );

        console.log("returned promiseall", coordinates_arr);
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
        setDest((prev) => ({
          ...prev,
          destList: updatedDestList,
        }));
      } catch (error) {
        console.log("Fetch Coordinate Error", error);
      }
    };

    fetchCoordinates();
  }, [aiComplete, bbox, setDest]);
}
