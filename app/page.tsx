//*---------------------------------Home Page------------------------------------
"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

import { DestinationType } from "./helpers/types";
import { useRouter } from "next/navigation";
import { toastError } from "@/helpers/toast";

import { Map } from "@/components/Map/Map";
import { GenerateButton } from "@/components/Button/GenerateButton";
import MobileAnt from "@/components/Ant/MobileAnt";
import { SearchParams } from "@/components/SearchParams/SearchParams";

import { useGlobalContext } from "@/Context";
import "./home.scss";

//*Force AntDesign component to be imported as client instead of SSR
const AntDateRange = dynamic(() => import("@/components/Ant/AntDateRange"), {
  ssr: false,
});

export default function Home() {
  const { isMobile } = useGlobalContext();

  const router = useRouter();

  const [destination, setDestination] = useState<DestinationType>({
    trip_id: "",
    name: "",
    description: "",
    bbox: "",
    start_date: "",
    end_date: "",
    duration: 0,
    ai_message: "",
    created_date: "",
    locations: {},
  });
  console.log(destination);
  const searchParamsObject = {
    destination_name: destination.name,
    start_date: destination.start_date,
    end_date: destination.end_date,
    bbox: destination.bbox,
  };

  function validateSubmit(e: any) {
    console.log("target", e.target);
    if (e.target.destination_name.value == "") {
      toastError("Please Choose a Destination Using the Map");
    } else if (e.target.start_date.value == "") {
      toastError("Please Choose Destination Start Date");
    } else if (e.target.end_date.value == "") {
      toastError("Please Choose Destination End Date");
    } else {
      router.push(
        `/routes/trip-details?destination=${destination.name}&start_date=${destination.start_date}&end_date=${destination.end_date}&bbox=${destination.bbox}`
      );
    }
  }

  return (
    <main id="home-main" className="page-container">
      <h1>Your Travel Plans Reimagined with AI-driven itineraries.</h1>
      <div id="home_content">
        <Map setDestination={setDestination} destination={destination} />
        <form
          action="./routes/tripDetails"
          onSubmit={(e) => {
            e.preventDefault();
            validateSubmit(e);
          }}
        >
          <SearchParams params={searchParamsObject} />

          {isMobile ? (
            <MobileAnt dest={destination} setDest={setDestination} />
          ) : (
            <AntDateRange setDest={setDestination} />
          )}
          <GenerateButton endDate={destination.end_date} />
        </form>
      </div>
    </main>
  );
}
