//*
//*--------------------------/trip?destination=___ & date=______------------------------------------

"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { capitalizeWords } from "../../helpers/helper-functions";
import { Message, destType } from "../../helpers/types";
import Map from "../../components/Map";

import { sanitize } from "isomorphic-dompurify";

type DestCoordType = {
  [key: string]: [longitude: number, latitude: number];
};

//DO NOT make a page function an async function
export default function Trip() {
  //*================================================================================
  //*States declarations */
  //obtain data from querystring of previously submitted form
  const [destination, setDestination] = useState<destType>({
    name: useSearchParams().get("destination") || "",
    bbox: "",
  });
  const startDate = useSearchParams().get("startDate");
  const endDate = useSearchParams().get("endDate");

  //*TODO TRY USING useMemo here
  // const [initialCoord] = useState<[number, number]>([
  //   Number(useSearchParams().get("x")),
  //   Number(useSearchParams().get("y")),
  // ]);

  const bbox = useSearchParams().get("bbox");

  //hold user input and ai message inside a string
  //which will be assigned to messagepayload during submit event
  const [userMessage, setUserMessage] = useState<string>("");
  const [aiMessage, setAiMessage] = useState<string>(``);
  //aiComplete=true when openai stream for response is complete
  const [aiComplete, setAiComplete] = useState<boolean>(false);
  //message payload will have user and aimessage objects added to it
  const [messagePayload, setMessagePayload] = useState<Message[]>([
    {
      role: "system",
      content:
        "You are TripGPT, you create itineraries for the user based on chosen destination and date range. You will give me the itinerary in an ordered list that has fun attractions and food locations for morning, midday and evening. The format for the ordered list answer is: Date, location and time of day in one new line, things to do as bullet list ",
    },
    {
      role: "user",
      content: `Create a detailed itinerary for my trip to ${capitalizeWords(
        destination.name
      )} from ${startDate} to ${endDate}. Make sure that the destinations are all within a city distance. Wrap all the locations in an html <a target="_blank" class="ai-location" ></a> tag with an href to https://google.com/search?q={location}. Structure the itinerary for each day: Start with "Day X - [Date]" and divide it into different time slots (e.g., Morning, Midday, Evening).  Give the result in an indented list style using HTML elements <div class="ai-snap-section"><h2 class="ai-date" >date</h2><h3>time of day</h3> <a target="_blank" class="ai-location" >location</a><ul class="ai-list"><li>description</li></ul></div>. Wrap the whole ai response inside a <div class="ai-text"></div>. If there are more than 3 days for the trip, give a less detailed answer so that the user won't have to scroll too long to read.`,
    },
  ]);
  //currDest is current map focused destination
  // const [currDest, setCurrDest] = useState<[number, number]>(initialCoord);
  const [currDest, setCurrDest] = useState<[number, number]>();
  //list of all destinations
  const [destList, setDestList] = useState<DestCoordType>({});

  //*=================================================================================
  //*handle submit, assign messages to payload
  function handleConvo(event: any) {
    console.log("submit event");
    event.preventDefault();
    setAiComplete(false);
    setDestList({});
    setAiMessage("");
    setMessagePayload((prevMessage) => [
      ...prevMessage,
      { role: "assistant", content: aiMessage },
      { role: "user", content: userMessage },
    ]);
    setUserMessage("");
  }

  //*=================================================================================
  //*Select all anchor tags from aiMessage and assign mouseover event
  //*push to destList array the locations found
  useEffect(() => {
    const allLocations = document.querySelectorAll(".ai-location");
    //*Function to obtain specific destination coordinate */
    //*
    async function getCoord(location: string) {
      const destRes = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?bbox=${bbox}&limit=2&access_token=${process.env.MAPBOX_KEY}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!destRes.ok) {
        throw new Error(`Failed to fetch ${location} coordinate`);
      }
      const destCoord = await destRes.json();
      // console.log("destCoord: " + JSON.stringify(destCoord, null, 2));
      const x = destCoord.features[0].center[0];
      const y = destCoord.features[0].center[1];
      // console.log("loc " + location + " x " + x + " y " + y);
      return { x, y };
    }

    //*Fetch data from Mapbox geo data to get coordinates for all destinations
    //*assign destination as key and coordinates as values for destList
    //*
    const fetchCoordinates = async () => {
      // console.log("all locs: " + JSON.stringify(allLocations, null, 2));
      const coordinatePromises = Array.from(allLocations).map((location) => {
        return getCoord(location.innerHTML);
      });

      try {
        const coordinates = await Promise.all(coordinatePromises);
        const updatedDestList = coordinates.reduce(
          (prevList, coordinate, index) => {
            console.log(JSON.stringify(coordinate, null, 2));
            const location = allLocations[index].innerHTML;
            return {
              ...prevList,
              [location]: [coordinate.x, coordinate.y],
            };
          },
          {}
        );
        setDestList(updatedDestList);
      } catch (err) {
        console.log("Fetch Coordinate Erorr", err);
      }
    };

    fetchCoordinates();
  }, [aiComplete, bbox]);

  //*================================================================================ */
  //** add event delegation, ai-location class mouseover bubbles up to chat class     */
  useEffect(() => {
    console.log("changing destList");
    function handleLocHover(event: any) {
      setCurrDest(destList[event.target.innerText]);
    }
    const chatSection = document.querySelector(".chat");

    const handleHoverEvent = (event: any) => {
      if (event.target.classList.contains("ai-location")) {
        handleLocHover(event);
      }
    };
    chatSection!.addEventListener("mouseover", handleHoverEvent);

    return () => {
      chatSection!.removeEventListener("mouseover", handleHoverEvent);
    };
  }, [destList]);
  //*================================================================================= */
  //*Stream openai response data to aiMessage, auto fetch when payload is has new message added
  useEffect(() => {
    //!reset these variables for each time user makes adjustment
    console.log("changing payload");
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

        if (!res.ok) throw new Error("Failed to fetch API");

        if (!res.body) return;

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let done = false;

        while (!done) {
          const { value, done: doneReading } = await reader.read();
          done = doneReading;

          if (doneReading) setAiComplete(true);

          const chunkValue = decoder.decode(value);
          setAiMessage((prev) => prev + chunkValue);
        }
      } catch (err) {
        console.log(err);
      }
    }

    handleChatRequest();
  }, [messagePayload]);

  return (
    <div id="TripDetails">
      <Map
        currDest={currDest}
        destList={destList}
        setDestination={setDestination}
        // initialCoord={initialCoord}
      />

      <form id="trip_form" onSubmit={handleConvo}>
        <div id="h1_wrapper">
          <h1>Trip to {capitalizeWords(destination.name!)}</h1>
        </div>
        <section
          id="chat"
          className="chat"
          dangerouslySetInnerHTML={{ __html: sanitize(aiMessage) }}
        ></section>

        <aside id="adjustment">
          <textarea
            name="userMessage"
            placeholder="Replace museum with..."
            value={userMessage}
            onChange={({ target }) => setUserMessage(target.value)}
          />
          <button title="Submit adjustments" type="submit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
          </button>
        </aside>
      </form>
    </div>
  );
}
