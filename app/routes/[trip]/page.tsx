//*
//*--------------------------/tripId?tripId=________________------------------------------------

"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { capitalizeWords } from "../../helpers/helper-functions";

import Map from "@/components/Map/Map";

import { destType } from "@/helpers/types";

import DOMPurify from "isomorphic-dompurify";
import { toastError } from "@/helpers/toast";
import { useRouter } from "next/navigation";
import useFetchTripInfo from "./hooks/useFetchTripInfo";
import Itinerary from "@/components/Itinerary/Itinerary";
import AiChatBox from "@/components/AiChatBox/AiChatBox";
const DOMPurifyConfig = {
  ADD_ATTR: ["target"], //*allow target attribute on anchor tags to go through
};

type DestCoordType = {
  [key: string]: [longitude: number, latitude: number];
};

export default function Trip() {
  const tripId = useSearchParams().get("id")!;

  const [dest, setDest] = useState<destType>({
    destName: "",
    bbox: "",
    startDate: "",
    endDate: "",
    duration: "",
    aiMessage: "",
    destList: {},
    tripId: "",
  });

  useFetchTripInfo({ tripId, setDest });

  const [currDest, setCurrDest] = useState<[number, number]>();

  // useEffect(() => {
  //   function handleLocHover(event: any) {
  //     setCurrDest(dest.destList[event.target.innerText]);
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
  // }, [dest.destList]);

  // //*Auto scrolling to bottom as aiMessage text generates
  // useEffect(() => {
  //   const textarea = document.getElementById("chat");
  //   textarea!.scrollTop = textarea!.scrollHeight;
  // }, []);

  return (
    <div className="TripDetails page-container">
      <Map currDest={currDest} dest={dest} setDest={setDest} />
      <form className="trip_form">
        <Itinerary dest={dest} />
        {/* <AiChatBox
          userMessage={userMessage}
          aiComplete={aiComplete}
          setUserMessage={setUserMessage}
        /> */}
      </form>
    </div>
  );
}
