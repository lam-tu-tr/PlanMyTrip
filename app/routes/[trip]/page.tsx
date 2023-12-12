"use client";

import React, { useState } from "react";
import { destinationType } from "@/helpers/types";

import { useSearchParams } from "next/navigation";
import { Map } from "@/components/Map/Map";
import { Itinerary } from "@/components/Itinerary/Itinerary";

import { useFetchTripInfo } from "./hooks/useFetchTripInfo";
import { useHandleLocationHover } from "../trip-details/hooks/useHandleLocationHover";

import "../trip-details/trip-details.scss"; //same style sheet as trip-details

export default function Trip() {
  const trip_id = useSearchParams().get("id")!;

  const [destination, setDestination] = useState<destinationType>({
    name: "",
    bbox: "",
    start_date: "",
    end_date: "",
    duration: "",
    aiMessage: "",
    location_list: {},
    created_date: "",
    trip_id: "",
  });

  useFetchTripInfo({ trip_id, setDestination });

  const [currDest, setCurrDest] = useState<[number, number]>();
  useHandleLocationHover(destination.location_list, setCurrDest);

  return (
    <div className="TripDetails page-container">
      <Map
        currDest={currDest}
        destination={destination}
        setDestination={setDestination}
      />
      <section className="itinerary_container">
        <Itinerary
          aiMessage={destination.aiMessage}
          destination={destination.name}
        />
      </section>
    </div>
  );
}
