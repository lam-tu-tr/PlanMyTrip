"use client";

import React, { useState } from "react";
import { DestinationType } from "@/helpers/types";

import { useSearchParams } from "next/navigation";
import { Map } from "@/components/Map/Map";
import { Itinerary } from "@/components/Itinerary/Itinerary";

import { useFetchTripInfo } from "./hooks/useFetchTripInfo";
import { useHandleLocationHover } from "../trip-details/hooks/useHandleLocationHover";

import "../trip-details/trip-details.scss"; //same style sheet as trip-details
import { LngLatLike } from "mapbox-gl";

export default function Trip() {
  const trip_id = useSearchParams().get("id")!;

  const [destination, setDestination] = useState<DestinationType>({
    name: "",
    description: "",
    bbox: "",
    start_date: "",
    end_date: "",
    duration: 1,
    locations: {},
    created_date: "",
    trip_id: "",
  });

  const [currDest, setCurrDest] = useState<LngLatLike>();

  useFetchTripInfo({ trip_id, setDestination });

  useHandleLocationHover(destination.locations, setCurrDest);

  // useHandleLocationHover(destination.locations, setCurrDest);

  return (
    <div className="TripDetails page-container">
      <Map
        currDest={currDest}
        destination={destination}
        setDestination={setDestination}
        geocoder_visible={false}
      />

      <Itinerary destination={destination} />
    </div>
  );
}
