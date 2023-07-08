//*
//*--------------------------/trip?destination=___ & date=______------------------------------------

"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { capitalizeWords } from "../../helpers/helper-functions";
import { Message, destType } from "../../helpers/types";
import Map from "../../components/Map";

import DOMPurify from "isomorphic-dompurify";
const DOMPurifyConfig = {
  ADD_ATTR: ["target"], //*allow target attribute on anchor tags to go through
};

type DestCoordType = {
  [key: string]: [longitude: number, latitude: number];
};

//DO NOT make a page function an async function
export default function Trip() {
  //*================================================================================
  //*States declarations */

  const tripId = useSearchParams().get("tripId");

  //obtain data from querystring of previously submitted form
  const [dest, setDest] = useState<destType>({
    name: "",
    bbox: "",
    startDate: "",
    endDate: "",
    aiMessage: "",
    destList: {},
    duration: "",
  });
  console.log(JSON.stringify(dest, null, 2));
  const [currDest, setCurrDest] = useState<[number, number]>();

  //*................................USE EFFECTS..................................... */

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

  //*Auto scrolling to bottom as aiMessage text generates
  useEffect(() => {
    const textarea = document.getElementById("chat");
    textarea!.scrollTop = textarea!.scrollHeight;
  }, []);

  useEffect(() => {
    console.log("initial post in tripId");
    async function initVars() {
      try {
        console.log("handleNewAccount");
        const res = await fetch("../../api/trip", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            dbPayload: tripId,
            type: "getTrip",
          }),
        });

        if (!res.ok) throw new Error("Failed to Init Variables");

        const { tripInfo } = await res.json();

        setDest({
          name: tripInfo.destName,
          bbox: tripInfo.bbox,
          startDate: tripInfo.startDate,
          endDate: tripInfo.endDate,
          aiMessage: tripInfo.aiMessage,
          destList: tripInfo.destList,
          duration: "",
        });
        console.log("Vars init Successful");
      } catch (err) {
        alert(err);
      }
    }

    initVars();
  }, [tripId]);

  return (
    <div id="TripDetails">
      {/* <Map
        // currDest={currDest}
        dest={dest}
        setDest={setDest}
      /> */}

      <form id="trip_form">
        <div id="h1_wrapper">
          <h1>Trip to {capitalizeWords(dest.name!)}</h1>
        </div>
        <section
          id="chat"
          className="chat"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(dest.aiMessage, DOMPurifyConfig),
          }}
        ></section>
      </form>
    </div>
  );
}
