//--------------------------/trip?destination=___ & date=______------------------------------------
"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { handleSubmitPrompt } from "../helpers/handleSubmitPrompt";

import { CapitalizeWords } from "../helpers/small_functions";

export default async function Trip() {
  const destination = useSearchParams().get("destination");
  const startDate = useSearchParams().get("startDate");
  const endDate = useSearchParams().get("endDate");

  const [messagePayload, setMessagePayload] = useState([
    // {
    //   role: "system",
    //   content:
    //     "You are TripGPT, you create itineraries for the user based on chosen destination and date range",
    // },
    {
      role: "user",
      content: `Create an itinerary for my trip to ${CapitalizeWords(
        destination!
      )} from ${startDate} to ${endDate}`,
    },
  ]);
  useEffect(() => {
    console.log("inside useffect");
    async function handleChatRequest() {
      const res = await handleSubmitPrompt(messagePayload);
      const data = await res.json();
      console.log("generatedText: " + data.statement);
      // Do something with the generated text
    }

    handleChatRequest();
  }, [messagePayload]);
  // console.log("payload: " + messagePayload[1].content);

  // useEffect(() => {}, [messagePayload]);

  return <div>hello world</div>;
}
