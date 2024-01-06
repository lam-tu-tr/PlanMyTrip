import { FaRegCalendarAlt, FaRegCopy } from "react-icons/fa";
import { LuSave } from "react-icons/lu";
import { GrRefresh } from "react-icons/gr";

import { capitalizeWords } from "@/helpers/helper-functions";

import { copyToClipboard } from "../../helpers/helper-functions";

import { DestinationType } from "@/helpers/types";

import { ObjAccordion } from "../ObjAccordion/ObjAccordion";
import { Spacer } from "../Spacer/Spacer";
import { ScrollArea } from "@/components/ui/scroll-area";

import dayjs from "dayjs";
import { Skeleton } from "@/components/ui/skeleton";

import "./Itinerary.scss";
import { handleSaveToDB } from "@/routes/trip-details/helpers/handleSaveToDB";
import { toastError, toastSuccess } from "@/helpers/toast";
import { useSession } from "next-auth/react";

type ItineraryType = {
  destination: DestinationType;
  setAiComplete: React.Dispatch<React.SetStateAction<boolean>> | null;
  setDestination: React.Dispatch<React.SetStateAction<DestinationType>>;
};

export function Itinerary({
  destination,
  setAiComplete,
  setDestination,
}: ItineraryType) {
  const { data: session } = useSession();

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

      {setAiComplete && <Spacer type={"dashed"} />}

      {setAiComplete && (
        <div className="card_style itinerary__links">
          <button
            title="Regenerate trip"
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
            title="Save trip to account"
            onClick={async () => {
              const trip_id = await handleSaveToDB(destination);
              setDestination((prevDest) => ({
                ...prevDest,
                trip_id: trip_id,
              }));
              if (!session) toastError("Login to save your itineraries");
              else toastSuccess("Trip saved");
            }}
            type="button"
          >
            <LuSave className="w-6 h-6" />
          </button>

          <button
            title="Copy Trip Link"
            onClick={() => {
              if (destination.trip_id !== "") {
                copyToClipboard(destination.trip_id);
                toastSuccess("Trip link copied");
              } else toastError("Save trip to share link");
            }}
            type="button"
          >
            <FaRegCopy className="w-6 h-6" />
          </button>
        </div>
      )}

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

    <ObjAccordion accordion_obj={{}} />
  </ScrollArea>
);
