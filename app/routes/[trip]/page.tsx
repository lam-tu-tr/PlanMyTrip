"use client";

import React, { useState } from "react";
import { destType } from "@/helpers/types";

import { useSearchParams } from "next/navigation";
import { Map } from "@/components/Map/Map";
import { Itinerary } from "@/components/Itinerary/Itinerary";

import { useFetchTripInfo } from "./hooks/useFetchTripInfo";
import { useHandleLocationHover } from "../trip-details/hooks/useHandleLocationHover";

import "../trip-details/trip-details.scss"; //same style sheet as trip-details

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
