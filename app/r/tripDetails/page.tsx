//*
//*--------------------------/tripDetails?destination=___ & date=______etc------------------------------------

"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { capitalizeWords } from "../../helpers/helper-functions";
import { Message, destType } from "../../helpers/types";
import Map from "../../components/Map";

import { useGlobalContext } from "@/app/Context";
import { FiArrowUpCircle, FiSave, FiCopy } from "react-icons/fi";

import DOMPurify from "isomorphic-dompurify";
const DOMPurifyConfig = {
  ADD_ATTR: ["target"], //*allow target attribute on anchor tags to go through
};

//DO NOT make a page function an async function
export default function Trip() {
  //*================================================================================
  //*States declarations */

  // const { currUsername, setCurrUsername } = useGlobalContext();

  const currUsername =
    typeof window !== "undefined" ? window.localStorage.currentUser : "";

  //obtain data from querystring of previously submitted form
  const [dest, setDest] = useState<destType>({
    destName: useSearchParams().get("dest")!,
    bbox: useSearchParams().get("bbox")!,
    startDate: useSearchParams().get("startDate")!,
    endDate: useSearchParams().get("endDate")!,
    duration: useSearchParams().get("duration") || "",
    aiMessage: "",
    destList: {},
  });

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
        dest.destName
      )} from ${dest.startDate} to ${
        dest.endDate
      }. Make sure that the destinations are all within a city distance and that destinations within the same day are close to another so that the user won't have to drive long distances each day.  Structure the itinerary for each day: Start with "Day X - [Date]" and divide it into different time slots (e.g., Morning, Midday, Evening).  Give the result in an indented list style using HTML elements <div class="ai-snap-section"><h2 class="ai-date" >date</h2> <aside> <h2 class="timeofday">time of day </h2> \- <a  class="ai-location" rel="noopener noreferrer" target="_blank" href="https://google.com/search?q={location}"> location</a></aside><ul class="ai-list"><li>description</li></ul></div>. Wrap the whole ai response inside a <div class="ai-text"></div>. `,
    },
  ]);

  const [currDest, setCurrDest] = useState<[number, number]>();

  const router = useRouter();

  //*................................Functions............................................*/
  //
  //*handle submit, assign messages to payload
  function handleConvo(e: any) {
    //!reset these variables for each time user submits adjustments
    e.preventDefault();
    setAiComplete(false);
    setDest((prev) => ({
      ...prev,
      destList: {},
    }));
    setAiMessage("");
    setMessagePayload((prevMessage) => [
      ...prevMessage,
      { role: "assistant", content: aiMessage },
      { role: "user", content: userMessage },
    ]);
    setUserMessage("");
    //*TODO add Map marker removals
  }

  //*Handle Save to db
  async function handleSaveToDB(type: string) {
    //*TODO check if trip exists before creating another using upturn or soemthing
    try {
      console.log("handleSaveTrip");
      const res = await fetch("../../api/trip", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dbPayload: {
            username: currUsername,
            destName: dest.destName,
            aiMessage: aiMessage,
            destList: dest.destList,
            bbox: dest.bbox,
            startDate: dest.startDate,
            endDate: dest.endDate,
          },
          type: "create",
        }),
      });

      if (!res.ok) throw new Error("Failed to save to account");

      const { tripId } = await res.json();

      copyToClipboard(tripId);

      if (type === "save") router.push(`/r/tripId?tripId=${tripId}`);
      alert("Saved to Account");
    } catch (err) {
      alert(err);
    }
  }
  //

  async function copyToClipboard(tripId: string) {
    try {
      await navigator.clipboard.writeText(
        `${window.location.href}/routes/tripId?tripId=${tripId}`
      );
    } catch (err) {
      console.log("failed to copy", err);
    }
  }
  //*
  //*................................USE EFFECTS..................................... */
  //*
  //*Select all anchor tags from aiMessage and assign mouseover event
  //*push to destList array the locations found
  useEffect(() => {
    const allLocations = document.querySelectorAll(".ai-location");
    //*
    //*Unit Function to obtain specific destination coordinate */
    //*Called multiple times in fetchCoordinate()
    async function getCoord(location: string) {
      const destRes = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?bbox=${dest.bbox}&limit=2&access_token=${process.env.MAPBOX_KEY}`,
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
      // console.log("loc " + location + " x " + x + " y " + y);
      return { x, y };
    }

    //*Fetch data from Mapbox geo data to get coordinates for all destinations
    //*assign destination as key and coordinates as values for destList
    //*
    const fetchCoordinates = async () => {
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
        setDest((prev) => ({
          ...prev,
          destList: updatedDestList,
        }));
      } catch (err) {
        console.log("Fetch Coordinate Erorr", err);
      }
    };

    fetchCoordinates();
  }, [aiComplete, dest.bbox]);

  //*------------
  //** add event delegation, ai-location class mouseover bubbles up to chat class     */
  useEffect(() => {
    function handleLocHover(event: any) {
      setCurrDest(dest.destList[event.target.innerText]);
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
  }, [dest.destList]);
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

  //*Auto scrolling to bottom as aiMessage text generates
  useEffect(() => {
    const textarea = document.getElementById("chat");
    textarea!.scrollTop = textarea!.scrollHeight;
  }, [aiMessage]);

  return (
    <div id="TripDetails">
      <Map currDest={currDest} dest={dest} setDest={setDest} />

      <form id="trip_form" onSubmit={handleConvo}>
        <div id="h1_wrapper">
          <button
            title="Copy Trip Link"
            onClick={() => handleSaveToDB("")}
            type="button"
          >
            <FiCopy className="w-6 h-6 m-4" />
          </button>
          <h1>Trip to {capitalizeWords(dest.destName!)}</h1>

          <button
            title="Save to Account"
            onClick={() => handleSaveToDB("save")}
            type="button"
          >
            <FiSave className="w-6 h-6 m-4" />
          </button>
        </div>
        <section
          id="chat"
          className="chat"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(aiMessage, DOMPurifyConfig),
          }}
        ></section>

        <aside id="adjustment">
          <textarea
            id="textArea"
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
