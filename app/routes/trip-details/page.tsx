"use client";

import React, { useEffect, useMemo, useState } from "react";

import { Map } from "@/components/Map/Map";
import { Itinerary } from "../../components/Itinerary/Itinerary";

import { useSearchParams } from "next/navigation";
import { DestinationType } from "@/helpers/types";

import { useHandleLocationCardClick } from "./hooks/useHandleLocationCardClick";

import { useAiFetch } from "./hooks/useAiFetch";
import { handleSaveToDB } from "./helpers/handleSaveToDB";

import "./trip-details.scss";
import { LngLatLike } from "mapbox-gl";
import { createSupabaseFrontendClient } from "@/supabase/createSupabaseFrontendClient";
import { User } from "@supabase/supabase-js";
import { toastError } from "@/helpers/toast";

export default function Trip() {
  const [user, setUser] = useState<User | null>(null);

  const supabase = createSupabaseFrontendClient();

  useEffect(() => {
    async function fetchUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    }

    fetchUser();
  }, [supabase.auth]);

  const searchParams = useSearchParams();

  const initialDestination = useMemo(() => {
    return {
      name: searchParams.get("destination")!,
      description: "",
      bbox: searchParams.get("bbox")!,
      start_date: searchParams.get("start_date")!,
      end_date: searchParams.get("end_date")!,
      duration:
        Number(searchParams.get("start_date"))! -
        Number(searchParams.get("end_date"))!,
      created_date: "",
      locations: {}, // Initial empty locations object
      trip_id: "",
    };
  }, [searchParams]);

  const [destination, setDestination] =
    useState<DestinationType>(initialDestination);

  const [aiComplete, setAiComplete] = useState<boolean>(false);

  const [currDest, setCurrDest] = useState<LngLatLike>();

  useEffect(() => {
    if (user) return;

    if (!aiComplete || destination.trip_id.length !== 0) return;

    //*set debounce to prevent multiple calls when aiComplete and dest trigger renders simutaneously
    const timeoutId = setTimeout(async () => {
      const db_id = await handleSaveToDB(destination);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [aiComplete, destination, user]);

  useAiFetch(destination, aiComplete, setAiComplete, setDestination);

  useHandleLocationCardClick(destination.locations, setCurrDest);

  return (
    <div className="TripDetails page-container">
      <div className="map-container">
        <Map
          currDest={currDest}
          destination={destination}
          setDestination={setDestination}
          geocoder_visible={false}
        />
      </div>

      <Itinerary
        destination={destination}
        setDestination={setDestination}
        setAiComplete={setAiComplete}
      />
    </div>
  );
}
