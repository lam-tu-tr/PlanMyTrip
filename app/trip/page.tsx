//--------------------------/trip?destination=___ & date=______------------------------------------
"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { handleSubmitPrompt } from "../helpers/handleSubmitPrompt";

import { CapitalizeWords } from "../helpers/small_functions";

//DO NOT make a page function an async function
export default function Trip() {
  const destination = useSearchParams().get("destination");
  const startDate = useSearchParams().get("startDate");
  const endDate = useSearchParams().get("endDate");
  const [userMessage, setUserMessage] = useState("");
  const [AiMessage, setAiMessage] = useState("");
  const [messagePayload, setMessagePayload] = useState([
    {
      role: "system",
      content:
        "You are TripGPT, you create itineraries for the user based on chosen destination and date range. You will give me the itinerary in an ordered list in this order: date>location> 3 things to do. The format for the answer is Date - Location and bullet list of things to do",
    },
    {
      role: "user",
      content: `Create an itinerary for my trip to ${CapitalizeWords(
        destination!
      )} from ${startDate} to ${endDate}`,
    },
  ]);

  function handleConvo(event: any) {
    event.preventDefault();

    setMessagePayload((prevMessage) => [
      ...prevMessage,
      { role: "system", content: AiMessage },
      { role: "user", content: userMessage },
    ]);
    setUserMessage("");
  }
  // console.log("destination" + destination);
  //infinite loop here, messagepayload changes in handleSubmitPrompt
  useEffect(() => {
    console.log("inside useffect");
    async function handleChatRequest() {
      const res = await handleSubmitPrompt(messagePayload, setMessagePayload);
      const data = await res.json();
      setAiMessage(data.data.aiResuitText);
      // console.log("generatedText: " + data?.data.aiResultText);
      // Do something with the generated text
    }

    handleChatRequest();
  }, [messagePayload]);
  console.log("messagePayload: " + JSON.stringify(messagePayload, null, 2));
  // console.log("payload: " + messagePayload[1].content);

  return (
    <div className="temp flex flex-col justify-around p-8">
      <form
        className="flex flex-col justify-between items-center h- bg-red-700 p-2"
        onSubmit={handleConvo}
      >
        <input
          className="bg-slate-500 p-2 py-1 w-96 h-14 rounded-lg border border-white text-white"
          type="text"
          name="userMessage"
          placeholder="Make adjustments"
          value={userMessage}
          onChange={({ target }) => setUserMessage(target.value)}
        />
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
}
//Create a function that pushes newly entered user inputs
//as an object to the messagePayload
