//*---------------------------------Home------------------------------------
"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import Map from "./components/Map";
import { destType } from "./helpers/types";
import dayjs from "dayjs";

//Force AntDesign component to be imported as client instead of ssr
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

export default function Home() {
  const { currUsername } = useGlobalContext();

  const [dest, setDest] = useState<destType>({
    name: "",
    bbox: "",
    startDate: "",
    endDate: "",
    duration: "",
    aiMessage: "",
    destList: {},
  });
  // const [startDate, setStartDate] = useState("");
  // const [endDate, setEndDate] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  // const [duration, setDuration] = useState("");

  const router = useRouter();

  function validateSubmit(e: any) {
    e.preventDefault();

    if (e.target[0].value == "") {
      alert("Please Choose a Destination Using the Map");
    } else if (e.target[1].value == "") {
      alert("Please Choose Destination Start Date");
    } else if (e.target[2].value == "") {
      alert("Please Choose Destination End Date");
    } else {
      router.push(
        `/routes/tripDetails?dest=${dest.name}&startDate=${dest.startDate}&endDate=${dest.endDate}&bbox=${dest.bbox}&duration=${dest.duration}`
      );
    }
  }

  useEffect(() => {
    // if (localStorage) {
    //   setCurrUsername(localStorage.currentUser);
    // }
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 700);
    };

    // Check if window exists (for client rendering)
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth <= 700);
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    } else {
      // Set the initial value for SSR
      setIsMobile(false);
    }
  }, []);

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
          <input type="hidden" required name="destination" value={dest.name} />
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

//*TODO EMOJI ICON or display destination name
