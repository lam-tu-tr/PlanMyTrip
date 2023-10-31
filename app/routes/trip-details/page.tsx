//*--------------------------/tripDetails?destination=___ & date=______etc------------------------------------

"use client";
import React, { useEffect, useState } from "react";

import Map from "@/components/Map/Map";
import Itinerary from "./components/Itinerary/Itinerary";
import AiChatBox from "./components/AiChatBox/AiChatBox";

import { useSearchParams } from "next/navigation";
import { Message, destType } from "@/helpers/types";

import setInitialPrompt from "./hooks/setInitialPrompt";
import handleConvo from "./hooks/handleConvo";
import useHandleLocationHover from "./hooks/useHandleLocationHover";
import useFetchLocation from "./hooks/useFetchLocations";
import useHandleAiStream from "./hooks/useHandleAiStream";

import "./trip-details.scss";

export default function Trip() {
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  useEffect(() => {
    setCurrentUser(window.sessionStorage.getItem("currentUser") || null);
  }, []);

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
    setInitialPrompt(dest)
  );

  useFetchLocation(aiComplete, setDest, dest.bbox);

  useHandleAiStream(messagePayload, setAiComplete, setDest);

  useHandleLocationHover(dest.destList, setCurrDest);

  return (
    <div id="TripDetails">
      <Map currDest={currDest} dest={dest} setDest={setDest} />

      <form
        id="trip_form"
        onSubmit={(e) => {
          e.preventDefault();
          handleConvo(
            dest.aiMessage,
            userMessage,
            setUserMessage,
            setAiComplete,
            setDest,
            setMessagePayload
          );
        }}
      >
        <Itinerary dest={dest} currentUser={currentUser} />
        <AiChatBox
          userMessage={userMessage}
          aiComplete={aiComplete}
          setUserMessage={setUserMessage}
        />
      </form>
    </div>
  );
}
