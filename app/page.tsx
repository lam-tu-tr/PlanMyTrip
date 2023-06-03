"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import AntDateRange from "./components/AntDateRange";

const SearchBox = dynamic(
  () => import("@mapbox/search-js-react").then((mod) => mod.SearchBox),
  { ssr: false }
);

const MAPBOX_API_KEY =
  "pk.eyJ1IjoibGFtaXNtIiwiYSI6ImNsaWR5eGVwNzBldjYza3Q4amJudHVhMWEifQ.WEc1LP70RJIxLj3ss0H1sQ";

export default function Home() {
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  console.log(destination);

  // useEffect(() => {
  //   if (!SearchBox.accessToken) {
  //     SearchBox.accessToken = MAPBOX_API_KEY;
  //   }
  // }, []);

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
          <SearchBox
            // IS THIS DANGEROUS? EXPOSED CLIENT KEY??
            accessToken={MAPBOX_API_KEY!}
            value={destination}
            onRetrieve={(location: any) =>
              setDestination(location.features[0].properties.name)
            }
            onChange={(location: any) => setDestination(location)}
          />
          {/* //hidden input to set date querystring */}
          <input type="hidden" name="destination" value={destination} />
          <input type="hidden" name="startDate" value={startDate} />
          <input type="hidden" name="endDate" value={endDate} />
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
