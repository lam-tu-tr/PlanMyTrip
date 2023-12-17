//* Obselete
// import { Coordinate, DestinationType } from "@/helpers/types";
// import { useEffect, useRef } from "react";
// import { handlePromiseAllWithRetries } from "../helpers/handlePromiseAllWithRetries";
// import { toastError } from "@/helpers/toast";

// export function useFetchLocation(
//   aiComplete: boolean,
//   setDestination: React.Dispatch<React.SetStateAction<DestinationType>>,
//   bbox: string,
//   locations: string[]
// ) {
//   const isFirstRender = useRef(true);

//   console.log("locations", locations);
//   useEffect(() => {
//     if (isFirstRender.current) {
//       isFirstRender.current = false;
//       return;
//     }

//     // const location_arr = document.querySelectorAll(".location-card");

//     const fetchCoordinates = async () => {
//       // Create array of promises
//       const coordinate_promises: Promise<Coordinate>[] = locations.map(
//         (location) => handleGetLocationCoordinate(location, bbox)
//       );
//       // const coordinate_promise_arr: Promise<Coordinate>[] = Array.from(
//       //   location_arr
//       // ).map((location) => {
//       //   return handleGetLocationCoordinate(location.innerHTML, bbox);
//       // });
//       try {
//         const coordinates_res: Coordinate[] = await handlePromiseAllWithRetries(
//           coordinate_promises
//         );

//         const updatedDestList = coordinates_res.reduce(
//           (prevList, coordinate, index) => {
//             const location_name: string = locations[index];
//             return {
//               ...prevList,
//               [location_name]: coordinate,
//             };
//           },
//           {}
//         );
//         console.log("updated list", updatedDestList);
//         setDestination((prev) => ({
//           ...prev,
//           locations: updatedDestList,
//         }));
//       } catch (error) {
//         console.log("Fetch Coordinate Error", error);
//         toastError("Unable to retrieve location coordinates");
//       }
//     };

//     fetchCoordinates();
//   }, [aiComplete, bbox, locations, setDestination]);
// }
