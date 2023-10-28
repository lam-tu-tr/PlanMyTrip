//*---------------------------------Home Page------------------------------------
"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import Map from "./components/Map";
import { destType } from "./helpers/types";
import dayjs from "dayjs";
import { useGlobalContext } from "@/app/Context";
import { toastError } from "./helpers/toast";
import MobileAnt from "./components/MobileAnt/MobileAnt";

//*Force AntDesign component to be imported as client instead of SSR
const AntDateRange = dynamic(() => import("./components/AntDateRange"), {
  ssr: false,
});
// const MobileAntDate = dynamic(() => import("./components/MobileAntDate"), {
//   ssr: false,
// });
// const MobileAntDurationPicker = dynamic(
//   () => import("./components/MobileAntDurationPicker"),
//   {
//     ssr: false,
//   }
// );

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

  const searchParamsObject = {
    destName: dest.destName,
    startDate: dest.startDate,
    endDate: dest.endDate,
    bbox: dest.bbox,
  };

  function validateSubmit(e: any, { destName, startDate, endDate, bbox }: any) {
    if (e.target[0].value == "") {
      toastError("Please Choose a Destination Using the Map");
    } else if (e.target[1].value == "") {
      toastError("Please Choose Destination Start Date");
    } else if (e.target[2].value == "") {
      toastError("Please Choose Destination End Date");
    } else {
      router.push(
        `/routes/trip-details?dest=${destName}&startDate=${startDate}&endDate=${endDate}&bbox=${bbox}`
      );
    }
  }

  return (
    <main id="home_main" className="bg-orange-200">
      <h1>Your Travel Plans Reimagined with AI-driven itineraries.</h1>
      <div id="home_content">
        <Map setDest={setDest} dest={dest} />
        <form
          id="home_form"
          action="./routes/tripDetails"
          onSubmit={(e) => {
            e.preventDefault();

            validateSubmit(e, searchParamsObject);
          }}
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
            <MobileAnt dest={dest} setDest={setDest} />
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
