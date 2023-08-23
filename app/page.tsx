//*---------------------------------Home------------------------------------
"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import Map from "./components/Map";
import { destType } from "./helpers/types";
import dayjs from "dayjs";

//*Force AntDesign component to be imported as client instead of SSR
const AntDateRange = dynamic(() => import("./components/AntDateRange"), {
  ssr: false,
});
const MobileAntDate = dynamic(() => import("./components/MobileAntDate"), {
  ssr: false,
});
const MobileAntDurationPicker = dynamic(
  () => import("./components/MobileAntDurationPicker"),
  {
    ssr: false,
  }
);
import { useGlobalContext } from "@/app/Context";
import { toastError } from "./helpers/toast";

export default function Home() {
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

  const { isMobile, setIsMobile } = useGlobalContext();

  const router = useRouter();

  function validateSubmit(e: any) {
    e.preventDefault();

    if (e.target[0].value == "") {
      toastError("Please Choose a Destination Using the Map");
    } else if (e.target[1].value == "") {
      toastError("Please Choose Destination Start Date");
    } else if (e.target[2].value == "") {
      toastError("Please Choose Destination End Date");
    } else {
      router.push(
        `/routes/trip-details?dest=${dest.destName}&startDate=${dest.startDate}&endDate=${dest.endDate}&bbox=${dest.bbox}`
      );
    }
  }

  useEffect(() => {
    //* Set end date based on selected duration for mobile
    if (dest.duration.length > 0 && dest.startDate.length > 0) {
      setDest((prev) => ({
        ...prev,
        endDate: dayjs(dest.startDate)
          .add(Number(dest.duration), "day")
          .format("MMM DD, YYYY"),
      }));
    }
  }, [dest.duration, dest.startDate]);

  return (
    <main id="home_main" className="bg-orange-200">
      <h1>Your Travel Plans Reimagined with AI-driven itineraries.</h1>
      <div id="home_content">
        <Map setDest={setDest} dest={dest} />
        <form
          id="home_form"
          action="./routes/tripDetails"
          onSubmit={validateSubmit}
        >
          {/* //hidden input to set date querystring upon submission */}
          <input
            type="hidden"
            required
            name="destination"
            value={dest.destName}
          />
          <input
            type="hidden"
            required
            name="startDate"
            value={dest.startDate}
          />
          <input type="hidden" required name="endDate" value={dest.endDate} />
          <input type="hidden" required name="bbox" value={dest.bbox} />

          {isMobile ? (
            <div id="choice-wrapper">
              <MobileAntDate dest={dest} setDest={setDest} />

              <MobileAntDurationPicker setDest={setDest} />
              <span
                className={
                  dest.endDate.length !== 0
                    ? "bg-white"
                    : "border-dashed border-white border-2"
                }
              >
                {dest.endDate.length !== 0
                  ? `End Date: ${dest.endDate}`
                  : `End Date `}
              </span>
            </div>
          ) : (
            <AntDateRange setDest={setDest} />
          )}

          <button
            className=" bg-blue-300 rounded-md"
            title="Generate Itinerary"
            type="submit"
          >
            Generate Itinerary
          </button>
        </form>
      </div>
    </main>
  );
}
