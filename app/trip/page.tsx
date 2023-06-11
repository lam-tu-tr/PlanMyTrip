//--------------------------/trip?destination=___ & date=______------------------------------------
"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { capitalizeWords } from "../helpers/helper-functions";

import { Message } from "../helpers/types";
import Map from "../components/Map";

//DO NOT make a page function an async function
export default function Trip() {
  //obtain data from querystring of previously submitted form
  const destination = useSearchParams().get("destination");
  const startDate = useSearchParams().get("startDate");
  const endDate = useSearchParams().get("endDate");
  //hold user input and ai message inside a string
  //which will be assigned to messagepayload during submit event
  const [userMessage, setUserMessage] = useState<string>("");
  const [aiMessage, setAiMessage] = useState<string>(``);
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
        destination!
      )} from ${startDate} to ${endDate}. Wrap all the locations in an html <a target="_blank" classname="ai-location" ></a> tag with an href to https://google.com/search?q={location}. Give the result in an indented list style using HTML elements <ol> and <li>. Wrap the whole ai response inside a <div></div>. Remove everything outside of this <div> element`,
    },
  ]);
  const [currDest, setCurrDest] = useState<[number, number]>([-117.16, 32.71]);
  const [destList, setDestList] = useState<string[]>([]);
  //Set map current location upon hover
  function handleLocHover(event: any) {
    // setCurrLoc(event.target.innerText);
    console.log("location: " + event.target.innerText);
  }

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
  // console.log("aiMessage: " + aiMessage);
  console.log(destList);

  //Select all anchor tags from aiMessage and assign mouseover event
  //push to destList array the locations found
  useEffect(() => {
    const allLocations = document.querySelectorAll(".ai-location");
    async function getCoord() {
      const destRes = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/Los_Angeles.json?limit=2&access_token=${process.env.MAPBOX_KEY}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const destCoord = destRes.json();

      console.log("coord: ");
      console.log(JSON.stringify(destCoord, null, 2));
    }
    allLocations.forEach((location) => {
      location.addEventListener("mouseover", handleLocHover);

      if (aiComplete) {
        getCoord();

        setDestList((prevList) => [...prevList, location.innerHTML]);
      }
    });

    return () => {
      allLocations.forEach((location) => {
        location.removeEventListener("mouseover", handleLocHover);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aiMessage, aiComplete]);

  //Stream openai response data to aiMessage
  useEffect(() => {
    //reset these variables for each time user makes adjustment
    setAiComplete(false);
    setDestList([]);
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

        if (!res.ok) {
          throw new Error("Failed to fetch API");
        }
        const data = res.body;
        if (!data) {
          return;
        }
        const reader = data.getReader();
        const decoder = new TextDecoder();
        let done = false;

        while (!done) {
          const { value, done: doneReading } = await reader.read();
          done = doneReading;
          if (done) {
            setAiComplete(true);
          }
          const chunkValue = decoder.decode(value);
          setAiMessage((prev) => prev + chunkValue);
        }
        // setAiMessage(data.aiResultText);
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
          {/* <a target="_blank" onMouseOver={(event) => handleLocHover(event)}>
            Los Angeles
          </a> */}
          <button type={"button"} onClick={() => setCurrDest([-122.43, 37.78])}>
            Location
          </button>
        </div>
        <section className="chat">
          <div dangerouslySetInnerHTML={{ __html: aiMessage }}></div>
        </section>

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
      <Map currLoc={currDest} />
      <script></script>
    </div>
  );
}
