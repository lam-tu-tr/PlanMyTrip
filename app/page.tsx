//*---------------------------------Home------------------------------------
"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Map from "./components/Map";
import { destType } from "./helpers/types";

//Force Ant component to be imported as client instead of ssr
const AntDateRange = dynamic(() => import("./components/AntDateRange"), {
  ssr: false,
});
const MobileAntDatePicker = dynamic(
  () => import("./components/MobileAntDatePicker"),
  {
    ssr: false,
  }
);
const MobileAntDurationPicker = dynamic(
  () => import("./components/MobileAntDurationPicker"),
  {
    ssr: false,
  }
);

export default function Home() {
  const [destination, setDestination] = useState<destType>({
    name: "",
    x: "",
    y: "",
  });
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  console.log("start: " + startDate + "end: " + endDate);
  function validateSubmit(e: any) {
    e.preventDefault();
    console.log(e.target[0].value);
    if (e.target[0].value == "") {
      alert("Please Choose a Destination Using the Map");
    } else if (e.target[1].value == "") {
      alert("Please Choose Destination Start Date");
    } else if (e.target[2].value == "") {
      alert("Please Choose Destination End Date");
    } else {
      e.currentTarget.submit();
    }
  }

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 700);
    };

    // Check if window object is available (for client-side rendering)
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

  return (
    <main id="home_main" className="bg-orange-200">
      <h1>Your Travel Plans Reimagined with AI-driven itineraries.</h1>
      <div id="home_content">
        <Map setDestination={setDestination} destList={{}} />
        <form id="home_form" action="./trip" onSubmit={validateSubmit}>
          {/* //hidden input to set date querystring upon submission */}
          {/*TODO ADD A ERROR MESSAGE IF NO DESTINATION ENTERED  */}
          <input
            type="hidden"
            required
            name="destination"
            value={destination.name}
          />
          <input type="hidden" required name="startDate" value={startDate} />
          <input type="hidden" required name="endDate" value={endDate} />
          <input type="hidden" required name="x" value={destination.x} />
          <input type="hidden" required name="y" value={destination.y} />

          {isMobile ? (
            <div id="choice-wrapper">
              <MobileAntDatePicker
                startDate={startDate}
                setStartDate={setStartDate}
              />
              <span>
                {endDate.length !== 0 ? `End Date: ${endDate}` : `End Date `}
              </span>
              <MobileAntDurationPicker
                startDate={startDate}
                setEndDate={setEndDate}
              />
            </div>
          ) : (
            <AntDateRange setStartDate={setStartDate} setEndDate={setEndDate} />
          )}

          <button className="bruh bg-blue-300 rounded-md" type="submit">
            Generate Itinerary
          </button>
        </form>
      </div>
    </main>
  );
}

//*TODO Add an error message for when no destination has been entered and user tries to submit form

//*TODO add a zoom out using fitBound method

//*TODO add a share button

//*TODO EMOJI ICON or display destination name
