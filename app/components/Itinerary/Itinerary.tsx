import { Fragment } from "react";

import { FaRegCopy } from "react-icons/fa";
import { capitalizeWords } from "@/helpers/helper-functions";

import { copyToClipboard } from "../../helpers/helper-functions";

import { LocationCard } from "../LocationCard/LocationCard";
import { LocationDateType, LocationType } from "@/helpers/types";
import { LocationCardSeparator } from "../LocationCardSeparator/LocationCardSeparator";

import "./Itinerary.scss";

type ItineraryType = {
  destination: string;
  trip_id: string;
  locations: LocationDateType;
};

export function Itinerary({ destination, trip_id, locations }: ItineraryType) {
  return (
    <section className="itinerary_container">
      <div className="itinerary__header">
        <h1>{capitalizeWords(destination!)}</h1>
        <button
          title="Copy Trip Link"
          onClick={() => copyToClipboard(trip_id)}
          type="button"
        >
          <FaRegCopy className="w-6 h-6" />
        </button>
      </div>

      <ul className="itinerary">
        {/* {Object.entries(locations).map(([date, info], index) => (
          <Fragment key={index}>
            <LocationCardSeparator />
            <LocationCard name={name} info={info} />
          </Fragment>
        ))} */}
      </ul>
    </section>
  );
}
