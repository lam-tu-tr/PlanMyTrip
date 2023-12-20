"use client";

import React, { useEffect, useState } from "react";

import { Map } from "@/components/Map/Map";
import { Itinerary } from "../../components/Itinerary/Itinerary";

import { useSearchParams } from "next/navigation";
import { Message, DestinationType } from "@/helpers/types";

import { handleSetInitialPrompt } from "./helpers/handleSetInitialPrompt";

import { useHandleLocationHover } from "./hooks/useHandleLocationHover";
// import { useFetchLocation } from "./hooks/useFetchLocations";
import { useAiFetch } from "./hooks/useAiFetch";
import { handleSaveToDB } from "./helpers/handleSaveToDB";

import "./trip-details.scss";

export default function Trip() {
  const [destination, setDestination] = useState<DestinationType>({
    name: useSearchParams().get("destination")!,
    description: "",
    bbox: useSearchParams().get("bbox")!,
    start_date: useSearchParams().get("start_date")!,
    end_date: useSearchParams().get("end_date")!,
    duration:
      Number(useSearchParams().get("end_date"))! -
      Number(useSearchParams().get("start_date"))!,
    created_date: "",
    locations: {},
    trip_id: "",
  });

  const [aiComplete, setAiComplete] = useState<boolean>(false);

  const [currDest, setCurrDest] = useState<[number, number]>();

  const [messagePayload, setMessagePayload] = useState<Message[]>(
    handleSetInitialPrompt(destination)
  );

  useEffect(() => {
    if (
      !aiComplete ||
      destination?.trip_id?.length !== 0 ||
      Object.keys(destination.locations).length === 0
    )
      return;

    //*set debounce to prevent multiple calls when aiComplete and dest trigger renders simutaneously
    const timeoutId = setTimeout(async () => {
      const db_id = await handleSaveToDB(destination);
      setDestination((prevDest: DestinationType) => ({
        ...prevDest,
        trip_id: db_id,
      }));
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [aiComplete, destination]);

  // useFetchLocation(
  //   aiComplete,
  //   setDestination,
  //   destination.bbox,
  //   Object.keys(destination.locations)
  // );

  useAiFetch(messagePayload, setAiComplete, setDestination);

  // useHandleLocationHover(destination.locations, setCurrDest);

  return (
    <div className="TripDetails page-container">
      <Map
        currDest={currDest}
        destination={destination}
        setDestination={setDestination}
      />

      <Itinerary
        locations={destination.locations}
        destination={destination.name}
        trip_id={destination.trip_id}
      />
    </div>
  );
}
