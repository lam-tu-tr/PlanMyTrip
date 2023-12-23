"use client";
import { FaRegCalendarAlt, FaRegCopy } from "react-icons/fa";

import { GrRefresh } from "react-icons/gr";

import { capitalizeWords } from "@/helpers/helper-functions";

import { copyToClipboard } from "../../helpers/helper-functions";

import { DestinationType } from "@/helpers/types";

import { ObjAccordion } from "../ObjAccordion/ObjAccordion";
import { Spacer } from "../Spacer/Spacer";
import { ScrollArea } from "@/components/ui/scroll-area";

import "./Itinerary.scss";
import dayjs from "dayjs";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";

type ItineraryType = {
  destination: DestinationType;
  setAiComplete: React.Dispatch<React.SetStateAction<boolean>>;
  setDestination: React.Dispatch<React.SetStateAction<DestinationType>>;
};

export function Itinerary({
  destination,
  setAiComplete,
  setDestination,
}: ItineraryType) {
  const router = useRouter();

  if (Object.keys(destination.locations).length === 0) {
    return PlaceHolder;
  }

  return (
    <ScrollArea className="itinerary_container">
      <div className="itinerary__header card_style">
        <h1>{capitalizeWords(destination.name)}</h1>
        <span>
          <FaRegCalendarAlt />
          {dayjs(destination.start_date).format("MMM DD, YYYY")} -{"  "}
          {dayjs(destination.end_date).format("MMM DD, YYYY")}
        </span>

        <span>{destination.description}</span>
      </div>

      <Spacer type={"dashed"} />

      <div className="card_style itinerary__links">
        <button
          title="Generate another"
          onClick={() => {
            setAiComplete(false);
            setDestination((prevDest) => ({
              ...prevDest,
              locations: {},
            }));
          }}
          type="button"
        >
          <GrRefresh className="w-6 h-6" />
        </button>

        <button
          title="Copy Trip Link"
          onClick={() => copyToClipboard(destination.trip_id)}
          type="button"
        >
          <FaRegCopy className="w-6 h-6" />
        </button>
      </div>

      <ObjAccordion accordion_obj={destination.locations} />
    </ScrollArea>
  );
}
const PlaceHolder = (
  <ScrollArea className="itinerary_container">
    <div className="itinerary__header card_style">
      <h1 className="w-full space-y-4 ">
        <Skeleton className="w-9/12 h-6" />
        <Skeleton className="w-9/12 h-6" />
      </h1>
      <span>
        <FaRegCalendarAlt />
        <Skeleton className="w-12 h-4" /> -
        <Skeleton className="w-12 h-4" />
      </span>

      <div className="w-full space-y-2">
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-full h-4" />
      </div>
    </div>

    <Spacer type={"dashed"} />

    <div className="card_style itinerary__links">
      <button title="Copy Trip Link" type="button">
        <FaRegCopy className="w-6 h-6" />
      </button>
    </div>

    <ObjAccordion accordion_obj={{}} />
  </ScrollArea>
);
