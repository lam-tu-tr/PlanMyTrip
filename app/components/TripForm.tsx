"use client";

import { useState, useEffect, useMemo } from "react";
import { handleSubmitPrompt } from "../helpers/handleSubmitPrompt";

import AntDateRange from "./AntDateRange";
import { Message } from "../helpers/types";

export default function TripForm() {
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState(["", ""]);
  // const [startDate, setStartDate] = useState(new Date());
  // const [endDate, setEndDate] = useState(addDays(new Date(), 7));
  const [initialRender, setInitialRender] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "system",
      content:
        "You are TripGPT, you create itineraries for the user based on chosen destination and date range",
    },
    {
      role: "user",
      content: "",
    },
  ]);

  function handleLocationChange(e: any) {
    //spread over data, but change name: value of input
    // setForm({ ...form, [e.target.name]: e.target.value });
    setDestination(e.target.value);

    // setMessages((prev): any => {
    //   const user = prev.find((item: Message) => item.role === "user");
    //   return [...prev, { ...user, content: e.target.value }];
    // });
  }

  const testMessage = useMemo(() => {
    return `Create an itinerary for my trip to ${destination} from ${date[0]} to ${date[1]}`;
  }, [destination, date]);

  //process user input and create a standardized initial prompt to submit to gpt
  function handleSubmit(event: any) {
    event.preventDefault();
    //iterate thru message and check for user role, then replace content
    //since initial, only one user object
    console.log("Destination: " + destination + "Date: " + date);
    // setMessages((prevMessages): any => {
    //   console.log("prevmess" + prevMessages);
    //   prevMessages.map((message) =>
    //     message.role === "user"
    //       ? {
    //           ...message,
    //           content: `Create an itinerary for my trip to ${destination} from ${date[0]} to ${}`,
    //         }
    //       : message
    //   );

    // const message = `Create an itinerary for my trip to ${destination} from ${date[0]} to ${date[1]}`;
    // console.log(testMessage);
    handleSubmitPrompt(testMessage, setMessages);
    // });

    setInitialRender(false);
  }

  // useEffect(() => {
  //   if (!initialRender) {
  //     console.log("current message" + JSON.stringify(messages, null, 2));
  //     // handleSubmitPrompt(messages, setMessages);
  //   }
  // }, [initialRender, messages]);

  return (
    <div className="temp flex flex-col justify-around p-8">
      <h1 className="text-3xl text-white">
        Simplify your trip planning with AI powered itineraries
      </h1>
      <form
        className="flex flex-col justify-between items-center h- bg-red-700 p-2"
        onSubmit={handleSubmit}
      >
        <input
          className="bg-slate-500 p-2 py-1 w-96 h-14 rounded-lg border border-white"
          name="destination"
          type="text"
          placeholder="Where to?"
          value={destination}
          onChange={handleLocationChange}
        />

        <AntDateRange setDate={setDate} setMessages={setMessages} />

        <button
          className="text-lg bg-blue-400 h-14 w-40 p-2 py-1 rounded-md border-1"
          type="submit"
        >
          Submit Prompt
        </button>
      </form>
    </div>
  );
}
