//--------------------------/trip?destination=___ & date=______------------------------------------
"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { capitalizeWords } from "../helpers/helper-functions";

import { Message } from "../helpers/types";

//DO NOT make a page function an async function
export default function Trip() {
  //obtain data from querystring of previously submitted form
  const destination = useSearchParams().get("destination");
  const startDate = useSearchParams().get("startDate");
  const endDate = useSearchParams().get("endDate");
  //hold user input and ai message inside a string
  //which will be assigned to messagepayload during submit event
  const [userMessage, setUserMessage] = useState<string>("");
  const [aiMessage, setAiMessage] = useState<string>("");
  //message payload will have user and aimessage objects added to it
  const [messagePayload, setMessagePayload] = useState<Message[]>([
    {
      role: "system",
      content:
        "You are TripGPT, you create itineraries for the user based on chosen destination and date range. You will give me the itinerary in an ordered list in this order: date>location> 3 things to do. The format for the answer is Date - Location and bullet list of things to do. Wrap all locations in html <a> tag.",
    },
    {
      role: "user",
      content: `Create an itinerary for my trip to ${capitalizeWords(
        destination!
      )} from ${startDate} to ${endDate}. Wrap all the locations in an html <a target="_blank"></a> tag with an href to https://google.com/search?q={location}.`,
    },
  ]);

  //Map Box Declaration
  var mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");

  mapboxgl.accessToken = process.env.MAPBOX_API_KEY;
  var map = new mapboxgl.Map({
    container: "YOUR_CONTAINER_ELEMENT_ID",
    style: "mapbox://styles/mapbox/streets-v11",
  });

  //handle submit, assign messages to payload
  function handleConvo(event: any) {
    event.preventDefault();

    setMessagePayload((prevMessage) => [
      ...prevMessage,
      { role: "assistant", content: aiMessage },
      { role: "user", content: userMessage },
    ]);
    setUserMessage("");
  }

  //infinite loop here, messagepayload changes in handleSubmitPrompt
  useEffect(() => {
    console.log("inside useffect");
    async function handleChatRequest() {
      try {
        const res = await fetch("/api/prompt", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: messagePayload,
          }),
        });

        if (!res.ok) {
          throw new Error("Failed to fetch API");
        }

        const data = await res.json();

        setAiMessage(data.aiResultText);
      } catch (err) {
        console.log(err);
      }
    }

    handleChatRequest();
  }, [messagePayload]);

  return (
    <div className="TripDetails">
      <form className=" bg-red-700" onSubmit={handleConvo}>
        <div>
          <h1 className="text-2xl">Trip to {capitalizeWords(destination!)}</h1>
        </div>
        <section
          className="chat"
          dangerouslySetInnerHTML={{ __html: aiMessage }}
        />

        <aside className=" bg-orange-300">
          <textarea
            className="bg-slate-500 p-2 py-1 h-18 rounded-lg border border-white text-white"
            name="userMessage"
            placeholder="Make adjustments"
            value={userMessage}
            onChange={({ target }) => setUserMessage(target.value)}
          />
          <button className="bg-green-300 rounded-md ml-4" type="submit">
            Send Message
          </button>
        </aside>
      </form>
      <figure className=" bg-blue-400" id="map"></figure>
    </div>
  );
}
