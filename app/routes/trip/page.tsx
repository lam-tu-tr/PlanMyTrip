//*
//*--------------------------/trip?destination=___ & date=______------------------------------------

"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { capitalizeWords } from "../../helpers/helper-functions";
import { Message, destType } from "../../helpers/types";
import Map from "../../components/Map";
import { sanitize } from "isomorphic-dompurify";

import { useGlobalContext } from "@/app/Context";
import { FiArrowUpCircle, FiSave, FiCopy } from "react-icons/fi";
type DestCoordType = {
  [key: string]: [longitude: number, latitude: number];
};

//DO NOT make a page function an async function
export default function Trip() {
  //*================================================================================
  //*States declarations */

  const { currUsername, setCurrUsername } = useGlobalContext();

  console.log("currUser: " + currUsername);
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
      )} from ${startDate} to ${endDate}. Make sure that the destinations are all within a city distance. Wrap all the locations in an html <a target="_blank" class="ai-location" ></a> tag with an href to https://google.com/search?q={location}. Structure the itinerary for each day: Start with "Day X - [Date]" and divide it into different time slots (e.g., Morning, Midday, Evening).  Give the result in an indented list style using HTML elements <div class="ai-snap-section"><h2 class="ai-date" >date</h2> <aside> <h2 class="timeofday">time of day </h2> \- <a target="_blank" class="ai-location" > location</a></aside><ul class="ai-list"><li>description</li></ul></div>. Wrap the whole ai response inside a <div class="ai-text"></div>.`,
    },
  ]);
  //currDest is current map focused destination
  // const [currDest, setCurrDest] = useState<[number, number]>(initialCoord);
  const [currDest, setCurrDest] = useState<[number, number]>();
  //list of all destinations
  const [destList, setDestList] = useState<DestCoordType>({});

  //*................................Functions............................................*/
  //
  //*handle submit, assign messages to payload
  function handleConvo(e: any) {
    //!reset these variables for each time user makes adjustment
    e.preventDefault();
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

  //*Handle Save to db
  async function handleSaveToDB() {
    try {
      console.log("handleSaveTrip");
      const res = await fetch("../../api/trip", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: currUsername,
          messagePayload: messagePayload,
          aiMessage: aiMessage,
          destList: destList,
          bbox: bbox,
          startDate: startDate,
          endDate: endDate,
        }),
      });

      if (!res.ok) throw new Error("Failed to save to account");

      alert("Saved to Account");
    } catch (err) {
      alert(err);
    }
  }
  //
  //*................................USE EFFECTS..................................... */
  //
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

  //*------------
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
  //*------------
  //*Stream openai response data to aiMessage, auto fetch when payload is has new message added
  useEffect(() => {
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
      />

      <form id="trip_form" onSubmit={handleConvo}>
        <div id="h1_wrapper">
          <button title="Copy Trip Link" type="button">
            <FiCopy className="w-6 h-6 m-4" />
          </button>
          <h1>Trip to {capitalizeWords(destination.name!)}</h1>
          <button
            title="Save to Account"
            onClick={handleSaveToDB}
            type="button"
          >
            <FiSave className="w-6 h-6 m-4" />
          </button>
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
            disabled={!aiComplete}
            onChange={({ target }) => setUserMessage(target.value)}
          />
          {aiComplete ? (
            <button title="Submit adjustments" type="submit">
              <FiArrowUpCircle className="w-8 h-8" />
            </button>
          ) : (
            <div className="spinner"></div>
          )}
        </aside>
      </form>
    </div>
  );
}
