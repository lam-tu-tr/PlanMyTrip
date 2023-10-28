//*
//*--------------------------/tripId?tripId=________________------------------------------------

"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { capitalizeWords } from "../../helpers/helper-functions";

import Map from "@/components/Map/Map";

import { destType } from "@/helpers/types";

import DOMPurify from "isomorphic-dompurify";
import { toastError } from "@/helpers/toast";
const DOMPurifyConfig = {
  ADD_ATTR: ["target"], //*allow target attribute on anchor tags to go through
};

type DestCoordType = {
  [key: string]: [longitude: number, latitude: number];
};

//*DO NOT make a page function an async function
export default function Trip() {
  //*================================================================================
  //*States declarations */

  const tripId = useSearchParams().get("tripId");

  //*obtain data from querystring of previously submitted form
  const [dest, setDest] = useState<destType>({
    destName: "",
    bbox: "",
    startDate: "",
    endDate: "",
    aiMessage: "",
    destList: {},
    duration: "",
    tripId: "",
  });

  const [currDest, setCurrDest] = useState<[number, number]>();

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
        console.log("tripInfo in tripId: " + JSON.stringify(tripInfo, null, 2));
        setDest({
          destName: tripInfo.destName,
          bbox: tripInfo.bbox,
          startDate: tripInfo.startDate,
          endDate: tripInfo.endDate,
          aiMessage: tripInfo.aiMessage,
          destList: tripInfo.destList,
          duration: "",
          tripId: tripInfo.tripId,
        });
        console.log("Vars init Successful");
      } catch (err) {
        toastError("Couldnt get trip info");
      }
    }

    initVars();
  }, [tripId]);

  return (
    <div id="TripDetails">
      <Map currDest={currDest} dest={dest} setDest={setDest} />

      <form id="trip_form">
        <div id="h1_wrapper">
          <h1>Trip to {capitalizeWords(dest.destName!)}</h1>
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
