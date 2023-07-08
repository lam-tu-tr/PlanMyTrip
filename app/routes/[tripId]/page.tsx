//*
//*--------------------------/tripId?tripId=________________------------------------------------

"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { capitalizeWords } from "../../helpers/helper-functions";
import { Message, destTypeTemp } from "../../helpers/types";
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

  const tripId = useSearchParams().get("tripId");

  //obtain data from querystring of previously submitted form
  const [dest, setDest] = useState<destTypeTemp>({
    name: "",
    bbox: "",
    startDate: "",
    endDate: "",
    aiMessage: "",
    destList: {},
  });

  // const [currDest, setCurrDest] = useState<[number, number]>();

  //*................................Functions............................................*/
  //
  //*
  //
  //*................................USE EFFECTS..................................... */
  //
  //*Select all anchor tags from aiMessage and assign mouseover event
  //*push to destList array the locations found
  // useEffect(() => {
  //   const allLocations = document.querySelectorAll(".ai-location");
  //   //*Function to obtain specific destination coordinate */
  //   //*
  //   async function getCoord(location: string) {
  //     const destRes = await fetch(
  //       `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?bbox=${bbox}&limit=2&access_token=${process.env.MAPBOX_KEY}`,
  //       {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     if (!destRes.ok) {
  //       throw new Error(`Failed to fetch ${location} coordinate`);
  //     }
  //     const destCoord = await destRes.json();
  //     // console.log("destCoord: " + JSON.stringify(destCoord, null, 2));
  //     const x = destCoord.features[0].center[0];
  //     const y = destCoord.features[0].center[1];
  //     // console.log("loc " + location + " x " + x + " y " + y);
  //     return { x, y };
  //   }

  //*Fetch data from Mapbox geo data to get coordinates for all destinations
  //*assign destination as key and coordinates as values for destList
  //*
  //   const fetchCoordinates = async () => {
  //     // console.log("all locs: " + JSON.stringify(allLocations, null, 2));
  //     const coordinatePromises = Array.from(allLocations).map((location) => {
  //       return getCoord(location.innerHTML);
  //     });

  //     try {
  //       const coordinates = await Promise.all(coordinatePromises);
  //       const updatedDestList = coordinates.reduce(
  //         (prevList, coordinate, index) => {
  //           console.log(JSON.stringify(coordinate, null, 2));
  //           const location = allLocations[index].innerHTML;
  //           return {
  //             ...prevList,
  //             [location]: [coordinate.x, coordinate.y],
  //           };
  //         },
  //         {}
  //       );
  //       setDestList(updatedDestList);
  //     } catch (err) {
  //       console.log("Fetch Coordinate Erorr", err);
  //     }
  //   };

  //   fetchCoordinates();
  // }, [aiComplete, bbox]);

  //*------------
  //** add event delegation, ai-location class mouseover bubbles up to chat class     */
  // useEffect(() => {
  //   console.log("changing destList");
  //   function handleLocHover(event: any) {
  //     setCurrDest(destList[event.target.innerText]);
  //   }
  //   const chatSection = document.querySelector(".chat");

  //   const handleHoverEvent = (event: any) => {
  //     if (event.target.classList.contains("ai-location")) {
  //       handleLocHover(event);
  //     }
  //   };
  //   chatSection!.addEventListener("mouseover", handleHoverEvent);

  //   return () => {
  //     chatSection!.removeEventListener("mouseover", handleHoverEvent);
  //   };
  // }, [destList]);

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
          name: "temp",
          bbox: tripInfo.bbox,
          startDate: tripInfo.startDate,
          endDate: tripInfo.endDate,
          aiMessage: tripInfo.aiMessage,
          destList: tripInfo.destList,
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
      <Map
        // currDest={currDest}
        destList={dest.destList}
        setDestination={setDest}
      />

      <form id="trip_form">
        <div id="h1_wrapper">
          <h1>Trip to {capitalizeWords(dest.name!)}</h1>
        </div>
        <section
          id="chat"
          className="chat"
          dangerouslySetInnerHTML={{ __html: sanitize(dest.aiMessage) }}
        ></section>
      </form>
    </div>
  );
}
