//*---------------------------------Home Page------------------------------------
"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import Map from "@/components/Map/Map";
import Button from "@/components/Button/Button";
import "./home.scss";
import { destType } from "./helpers/types";

import { useGlobalContext } from "@/Context";
import { toastError } from "@/helpers/toast";
import MobileAnt from "@/components/Ant/MobileAnt";
import SearchParams from "@/components/SearchParams";

//*Force AntDesign component to be imported as client instead of SSR
const AntDateRange = dynamic(() => import("@/components/Ant/AntDateRange"), {
  ssr: false,
});

import supabase from "@/supabase/supabaseClient";

export default function Home() {
  const { isMobile } = useGlobalContext();

  const router = useRouter();

  const [dest, setDest] = useState<destType>({
    tripId: "",
    destName: "",
    bbox: "",
    startDate: "",
    endDate: "",
    duration: "",
    aiMessage: "",
    destList: {},
  });

  const searchParamsObject = {
    destName: dest.destName,
    startDate: dest.startDate,
    endDate: dest.endDate,
    bbox: dest.bbox,
  };

  function validateSubmit(e: any) {
    if (e.target.destName.value == "") {
      toastError("Please Choose a Destination Using the Map");
    } else if (e.target.startDate.value == "") {
      toastError("Please Choose Destination Start Date");
    } else if (e.target.endDate.value == "") {
      toastError("Please Choose Destination End Date");
    } else {
      router.push(
        `/routes/trip-details?destName=${dest.destName}&startDate=${dest.startDate}&endDate=${dest.endDate}&bbox=${dest.bbox}`
      );
    }
  }

  return (
    <main id="home-main" className="page-container">
      <h1>Your Travel Plans Reimagined with AI-driven itineraries.</h1>
      <div id="home_content">
        <Map setDest={setDest} dest={dest} />
        <form
          action="./routes/tripDetails"
          onSubmit={(e) => {
            e.preventDefault();
            validateSubmit(e);
          }}
        >
          <SearchParams params={searchParamsObject} />

          {isMobile ? (
            <MobileAnt dest={dest} setDest={setDest} />
          ) : (
            <AntDateRange setDest={setDest} />
          )}
          <Button endDate={dest.endDate} />
        </form>
      </div>
    </main>
  );
}
