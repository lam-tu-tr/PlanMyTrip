//*---------------------------------Home------------------------------------
"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Map from "./components/Map";
import { destType } from "./helpers/types";
import dayjs from "dayjs";
//Force Ant component to be imported as client instead of ssr
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
  const { currUsername, setCurrUsername } = useGlobalContext();

  console.log("currUser in Home: " + currUsername);
  const [destination, setDestination] = useState<destType>({
    name: "",
    bbox: "",
  });
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [duration, setDuration] = useState("");

  // console.log("start: " + startDate + "end: " + endDate + "dur: " + duration);
  function validateSubmit(e: any) {
    e.preventDefault();
    console.log(e);
    // console.log(e.target[0].value);
    if (e.target[0].value == "") {
      alert("Please Choose a Destination Using the Map");
    } else if (e.target[1].value == "") {
      alert("Please Choose Destination Start Date");
    } else if (e.target[2].value == "") {
      alert("Please Choose Destination End Date");
    } else {
      // e.currentTarget.submit();
    }
  }

  useEffect(() => {
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
    if (duration.length > 0 && startDate.length > 0) {
      setEndDate(
        dayjs(startDate).add(Number(duration), "day").format("MMM DD, YYYY")
      );
    }
  }, [duration, startDate]);
  return (
    <main id="home_main" className="bg-orange-200">
      <h1>Your Travel Plans Reimagined with AI-driven itineraries.</h1>
      <div id="home_content">
        <Map setDestination={setDestination} destList={{}} />
        <form id="home_form" action="./routes/trip" onSubmit={validateSubmit}>
          {/* //hidden input to set date querystring upon submission */}
          <input
            type="hidden"
            required
            name="destination"
            value={destination.name}
          />
          <input type="hidden" required name="startDate" value={startDate} />
          <input type="hidden" required name="endDate" value={endDate} />
          <input type="hidden" required name="bbox" value={destination.bbox} />
          {/* <input type="hidden" required name="x" value={destination.x} />
          <input type="hidden" required name="y" value={destination.y} /> */}

          {isMobile ? (
            <div id="choice-wrapper">
              <MobileAntDate
                startDate={startDate}
                setStartDate={setStartDate}
              />

              <MobileAntDurationPicker setDuration={setDuration} />
              <span
                className={
                  endDate.length !== 0
                    ? "bg-white"
                    : "border-dashed border-white border-2"
                }
              >
                {endDate.length !== 0 ? `End Date: ${endDate}` : `End Date `}
              </span>
            </div>
          ) : (
            <AntDateRange setStartDate={setStartDate} setEndDate={setEndDate} />
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

//*TODO add a zoom out using fitBound method

//*TODO add a share button

//*TODO EMOJI ICON or display destination name
