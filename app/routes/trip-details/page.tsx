"use client";

import React, { useEffect, useState } from "react";

import { Map } from "@/components/Map/Map";
import { Itinerary } from "../../components/Itinerary/Itinerary";
import { AiChatBox } from "../../components/AiChatBox/AiChatBox";

import { useSearchParams } from "next/navigation";
import { Message, DestinationType } from "@/helpers/types";

import { handleSetInitialPrompt } from "./helpers/handleSetInitialPrompt";
import { handleConversation } from "./helpers/handleConversation";
import { useHandleLocationHover } from "./hooks/useHandleLocationHover";
import { useFetchLocation } from "./hooks/useFetchLocations";
import { useHandleAiStream } from "./hooks/useHandleAiStream";
import { handleSaveToDB } from "./helpers/handleSaveToDB";

import "./trip-details.scss";

export default function Trip() {
  const [destination, setDestination] = useState<DestinationType>({
    name: useSearchParams().get("destination")!,
    bbox: useSearchParams().get("bbox")!,
    start_date: useSearchParams().get("start_date")!,
    end_date: useSearchParams().get("end_date")!,
    duration: useSearchParams().get("duration") || "",
    aiMessage: "",
    created_date: "",
    location_list: {},
    trip_id: "",
  });

  const [userMessage, setUserMessage] = useState<string>("");

  const [aiComplete, setAiComplete] = useState<boolean>(false);

  const [currDest, setCurrDest] = useState<[number, number]>();

  const [messagePayload, setMessagePayload] = useState<Message[]>(
    handleSetInitialPrompt(destination)
  );

  useEffect(() => {
    if (!aiComplete || destination.trip_id.length !== 0) return;

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

  useFetchLocation(aiComplete, setDestination, destination.bbox);

  useHandleAiStream(messagePayload, setAiComplete, setDestination);

  useHandleLocationHover(destination.location_list, setCurrDest);

  return (
    <div className="TripDetails page-container">
      <Map
        currDest={currDest}
        destination={destination}
        setDestination={setDestination}
      />

      <form
        className="trip_form"
        onSubmit={(e) => {
          e.preventDefault();
          handleConversation(
            destination.aiMessage,
            userMessage,
            setUserMessage,
            setAiComplete,
            setDestination,
            setMessagePayload
          );
        }}
      >
        <Itinerary
          aiMessage={destination.aiMessage}
          destination={destination.name}
          trip_id={destination.trip_id}
        />
        <AiChatBox
          userMessage={userMessage}
          aiComplete={aiComplete}
          setUserMessage={setUserMessage}
        />
      </form>
    </div>
  );
}
