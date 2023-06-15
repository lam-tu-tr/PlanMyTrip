"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Map from "./components/Map";
import { DestCoordType, destType } from "./helpers/types";
//Force search-js-react to be imported as a client lib instead of ssr
// const SearchBox = dynamic(
//   () => import("@mapbox/search-js-react").then((mod) => mod.SearchBox),
//   { ssr: false }
// );
//Force Ant component to be imported as client instead of ssr
const AntDateRange = dynamic(() => import("./components/AntDateRange"), {
  ssr: false,
});

export default function Home() {
  const [destination, setDestination] = useState<destType>({
    name: "",
    x: "",
    y: "",
  });
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  console.log(destination);
  return (
    <main className=" flex flex-col items-center justify-between">
      <div className="Home flex flex-col justify-around p-7">
        <h1 className="text-4xl text-center text-white mb-8">
          Simplify your trip planning with AI powered itineraries
        </h1>
        <Map setDestination={setDestination} />
        <form
          className="flex flex-row justify-between items-center bg-red-700 p-2"
          action="./trip"
        >
          {/* //hidden input to set date querystring upon submission */}
          <input
            type="hidden"
            required
            name="destination"
            value={destination.name}
          />
          <input type="hidden" required name="startDate" value={startDate} />
          <input type="hidden" required name="endDate" value={endDate} />
          <input type="hidden" required name="x" value={destination.x} />
          <input type="hidden" required name="y" value={destination.y} />

          {/* <div className="h-12 width-96">
              <SearchBox
                accessToken={process.env.MAPBOX_KEY!}
                value={destination}
                onRetrieve={(location: any) =>
                  setDestination(location.features[0].properties.name)
                }
                onChange={(location: any) => setDestination(location)}
                theme={{ variables: {} }}
              />
            </div> */}
          <AntDateRange setStartDate={setStartDate} setEndDate={setEndDate} />
          <button
            className="text-lg bg-blue-400 h-10 w-40 p-2 py-1 rounded-md border-1, mr-7"
            type="submit"
          >
            Create Itinerary
          </button>
        </form>
      </div>
    </main>
  );
}
