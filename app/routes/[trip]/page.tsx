//*
//*--------------------------/tripId?tripId=________________------------------------------------
"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import Map from "@/components/Map/Map";

import { destType } from "@/helpers/types";

import useFetchTripInfo from "./hooks/useFetchTripInfo";
import Itinerary from "@/components/Itinerary/Itinerary";

import AiChatBox from "@/components/AiChatBox/AiChatBox";

import "../trip-details/trip-details.scss";
import useHandleLocationHover from "../trip-details/hooks/useHandleLocationHover";

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
  useHandleLocationHover(dest.destList, setCurrDest);

  return (
    <div className="TripDetails page-container">
      <Map currDest={currDest} dest={dest} setDest={setDest} />
      <section className="itinerary_container">
        <Itinerary dest={dest} />
      </section>
    </div>
  );
}
