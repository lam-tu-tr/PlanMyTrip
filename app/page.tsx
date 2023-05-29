//----------------------------HOME PAGE /---------------------------------------------
"use client";

import { useState } from "react";

import AntDateRange from "./components/AntDateRange";

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
          // onSubmit={handleSubmit}
          action="./trip"
        >
          <input
            className="bg-slate-500 p-2 py-1 w-96 h-14 rounded-lg border border-white"
            name="destination"
            required
            type="text"
            placeholder="Where to?"
            value={destination}
            // auto set destination value as user types
            onChange={({ target }) => setDestination(target?.value)}
          />
          {/* //hidden input to set date querystring */}
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
