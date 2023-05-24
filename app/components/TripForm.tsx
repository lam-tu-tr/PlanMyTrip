"use client";

import { useState } from "react";
import { handleSubmitPrompt } from "../helpers/handleSubmitPrompt";

import ReactDatePicker from "./ReactDatePicker";

import { addDays } from "date-fns";

import AntDateRange from "./AntDateRange";

export default function TripForm() {
  const [form, setForm] = useState({
    tripLocation: "",
    tripDate: "",
  });

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(addDays(new Date(), 7));

  function handleChangeList(e: any) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  return (
    <div className="temp flex flex-col justify-around p-8">
      <h1 className="text-3xl text-white">
        Simplify your trip planning with AI powered itineraries
      </h1>
      <form className="flex flex-col justify-between items-center h- bg-red-700 p-2">
        <input
          className="bg-slate-500 p-2 py-1 w-96 h-14 rounded-lg border border-white"
          name="tripLocation"
          type="text"
          placeholder="Where to?"
          value={form.tripLocation}
          onChange={handleChangeList}
        />

        {/* <ReactDatePicker
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        /> */}

        <AntDateRange />

        <button
          className="text-lg bg-blue-400 h-14 w-40 p-2 py-1 rounded-md border-1"
          type="submit"
          onClick={() => handleSubmitPrompt(form)}
        >
          Submit Prompt
        </button>
      </form>
    </div>
  );
}
