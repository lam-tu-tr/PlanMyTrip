//--------------------------/trip?destination=___ & date=______------------------------------------
"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { capitalizeWords } from "../helpers/helper-functions";
import { Message, destType } from "../helpers/types";
import Map from "../components/Map";

import DOMPurify from "dompurify";

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
    x: "",
    y: "",
  });
  const startDate = useSearchParams().get("startDate");
  const endDate = useSearchParams().get("endDate");
  const initialCoord: [number, number] = [
    Number(useSearchParams().get("x")),
    Number(useSearchParams().get("y")),
  ];

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
      )} from ${startDate} to ${endDate}. Wrap all the locations in an html <a target="_blank" class="ai-location" ></a> tag with an href to https://google.com/search?q={location}. Structure the itinerary for each day: Start with "Day X - [Date]" and divide it into different time slots (e.g., Morning, Midday, Evening). Give the result in an indented list style using HTML elements <ol> and <li>. Wrap the whole ai response inside a <div></div>.`,
    },
  ]);
  //currDest is current map focused destination
  const [currDest, setCurrDest] = useState<[number, number]>();
  //list of all destinations
  const [destList, setDestList] = useState<DestCoordType>({});

  //*=================================================================================
  //*handle submit, assign messages to payload
  function handleConvo(event: any) {
    event.preventDefault();

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
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?limit=2&access_token=${process.env.MAPBOX_KEY}`,
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

      const x = destCoord.features[0].center[0];
      const y = destCoord.features[0].center[1];
      return { x, y };
    }

    //*Fetch data from Mapbox geo data to get coordinates for all destinations
    //*assign destination as key and coordinates as values for destList
    //*
    const fetchCoordinates = async () => {
      const coordinatePromises = Array.from(allLocations).map((location) =>
        getCoord(location.innerHTML)
      );

      const coordinates = await Promise.all(coordinatePromises);

      const updatedDestList = coordinates.reduce(
        (prevList, coordinate, index) => {
          const location = allLocations[index].innerHTML;
          return {
            ...prevList,
            [location]: [coordinate.x, coordinate.y],
          };
        },
        {}
      );

      setDestList(updatedDestList);
    };

    fetchCoordinates();
  }, [aiComplete]);

  //*================================================================================ */
  //** add event delegation, ai-location class mouseover bubbles up to chat class     */
  useEffect(() => {
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
  //*Stream openai response data to aiMessage
  useEffect(() => {
    //!reset these variables for each time user makes adjustment
    setAiComplete(false);
    setDestList({});
    setAiMessage("");

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
    <div className="TripDetails">
      <form onSubmit={handleConvo}>
        <div className="rounded-t-lg pt-3">
          <h1 className="text-2xl border-b-2 pb-3">
            Trip to {capitalizeWords(destination.name!)}
          </h1>
        </div>
        <section
          className="chat"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(aiMessage) }}
        ></section>

        <aside className=" bg-orange-300 rounded-b-lg">
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
      <Map
        currDest={currDest}
        destList={destList}
        setDestination={setDestination}
      />
    </div>
  );
}
