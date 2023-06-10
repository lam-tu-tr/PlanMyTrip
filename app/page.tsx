"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

//Force search-js-react to be imported as a client lib instead of ssr
const SearchBox = dynamic(
  () => import("@mapbox/search-js-react").then((mod) => mod.SearchBox),
  { ssr: false }
);
//Force Ant component to be imported as client instead of ssr
const AntDateRange = dynamic(() => import("./components/AntDateRange"), {
  ssr: false,
});

export default function Home() {
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 h-full">
      <div className="temp flex flex-col justify-around p-8">
        <h1 className="text-3xl text-white">
          Simplify your trip planning with AI powered itineraries
        </h1>
        <form
          className="flex flex-col justify-between items-center h- bg-red-700 p-2"
          action="./trip"
        >
          {/* //hidden input to set date querystring upon submission */}
          <input
            type="hidden"
            required
            name="destination"
            value={destination}
          />
          <input type="hidden" required name="startDate" value={startDate} />
          <input type="hidden" required name="endDate" value={endDate} />

          <SearchBox
            // IS THIS DANGEROUS? EXPOSED CLIENT KEY??
            //apply searchbox search options here<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
            accessToken={process.env.MAPBOX_KEY!}
            value={destination}
            onRetrieve={(location: any) =>
              setDestination(location.features[0].properties.name)
            }
            onChange={(location: any) => setDestination(location)}
          />

          <AntDateRange setStartDate={setStartDate} setEndDate={setEndDate} />

          <button
            className="text-lg bg-blue-400 h-14 w-40 p-2 py-1 rounded-md border-1"
            type="submit"
          >
            Submit Prompt
          </button>
        </form>
      </div>
    </main>
  );
}
