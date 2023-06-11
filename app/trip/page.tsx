//--------------------------/trip?destination=___ & date=______------------------------------------
"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { capitalizeWords } from "../helpers/helper-functions";

import { Message } from "../helpers/types";
import Map from "../components/Map";

type DestCoordType = {
  [key: string]: [longitude: number, latitude: number];
};

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
        destination!
      )} from ${startDate} to ${endDate}. Wrap all the locations in an html <a target="_blank" class="ai-location"  ></a> tag with an href to https://google.com/search?q={location}. Give the result in an indented list style using HTML elements <ol> and <li>. Wrap the whole ai response inside a <div></div>. Remove everything outside of this <div> element`,
    },
  ]);
  //currDest is current map focused destination
  const [currDest, setCurrDest] = useState<[number, number]>([-117.16, 32.71]);
  //list of all destinations
  const [destList, setDestList] = useState<DestCoordType>({});

  console.log("currDest: " + currDest);
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
  //Set map current location upon hover
  function handleLocHover(event: any) {
    // setCurrLoc(event.target.innerText);
    console.log("location: " + event.target.innerText);
    // setCurrDest(destList[event.target.innerText]);
  }
  //Select all anchor tags from aiMessage and assign mouseover event
  //push to destList array the locations found
  useEffect(() => {
    //
    //*!select only when complete
    //
    const allLocations = document.querySelectorAll(".ai-location");
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
      const destCoord = await destRes.json();

      console.log("coord: ");
      const x = destCoord.features[0].geometry.coordinates[0];
      const y = destCoord.features[0].geometry.coordinates[1];
      return { x, y };
    }
    allLocations.forEach((location) => {
      location.addEventListener("mouseover", handleLocHover);

      if (aiComplete) {
        const coordinate = getCoord(location.innerHTML);
        // console.log(coordinate);
        coordinate.then(({ x, y }) => {
          setDestList((prevList) => ({
            ...prevList,
            [location.innerHTML]: [x, y],
          }));
        });
      }
    });

    return () => {
      allLocations.forEach((location) => {
        location.removeEventListener("mouseover", handleLocHover);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aiComplete]);

  //Stream openai response data to aiMessage
  useEffect(() => {
    //reset these variables for each time user makes adjustment
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

          <button type={"button"} onClick={() => setCurrDest([-122.43, 37.78])}>
            Location
          </button>
        </div>
        <section
          className="chat"
          dangerouslySetInnerHTML={{ __html: aiMessage }}
        >
          {/* <div ></div> */}
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
      {/* <Map currLoc={currDest} /> */}
      <script></script>
    </div>
  );
}
