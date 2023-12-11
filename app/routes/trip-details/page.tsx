"use client";

import React, { useEffect, useState } from "react";

import { Map } from "@/components/Map/Map";
import { Itinerary } from "../../components/Itinerary/Itinerary";
import { AiChatBox } from "../../components/AiChatBox/AiChatBox";

import { useSearchParams } from "next/navigation";
import { Message, destType } from "@/helpers/types";

import { handleSetInitialPrompt } from "./helpers/handleSetInitialPrompt";
import { handleConversation } from "./helpers/handleConversation";
import { useHandleLocationHover } from "./hooks/useHandleLocationHover";
import { useFetchLocation } from "./hooks/useFetchLocations";
import { useHandleAiStream } from "./hooks/useHandleAiStream";
import { handleSaveToDB } from "./helpers/handleSaveToDB";

import "./trip-details.scss";

export default function Trip() {
  const [dest, setDest] = useState<destType>({
    destName: useSearchParams().get("destName")!,
    bbox: useSearchParams().get("bbox")!,
    startDate: useSearchParams().get("startDate")!,
    endDate: useSearchParams().get("endDate")!,
    duration: useSearchParams().get("duration") || "",
    aiMessage: "",
    destList: {},
    tripId: "",
  });

  const [userMessage, setUserMessage] = useState<string>("");

  const [aiComplete, setAiComplete] = useState<boolean>(false);

  const [currDest, setCurrDest] = useState<[number, number]>();

  const [messagePayload, setMessagePayload] = useState<Message[]>(
    handleSetInitialPrompt(dest)
  );

  useEffect(() => {
    if (!aiComplete) return;

    //*set debounce to prevent multiple calls when aiComplete and dest trigger renders simutaneously
    const timeoutId = setTimeout(() => {
      handleSaveToDB(dest);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [aiComplete, dest]);

  useFetchLocation(aiComplete, setDest, dest.bbox);

  useHandleAiStream(messagePayload, setAiComplete, setDest);

  useHandleLocationHover(dest.destList, setCurrDest);

  return (
    <div className="TripDetails page-container">
      <Map currDest={currDest} dest={dest} setDest={setDest} />

      <form
        className="trip_form"
        onSubmit={(e) => {
          e.preventDefault();
          handleConversation(
            dest.aiMessage,
            userMessage,
            setUserMessage,
            setAiComplete,
            setDest,
            setMessagePayload
          );
        }}
      >
        <Itinerary dest={dest} />
        <AiChatBox
          userMessage={userMessage}
          aiComplete={aiComplete}
          setUserMessage={setUserMessage}
        />
      </form>
    </div>
  );
}
