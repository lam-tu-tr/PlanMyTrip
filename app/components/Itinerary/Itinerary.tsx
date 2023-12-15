import { FaRegCopy } from "react-icons/fa";
import { capitalizeWords } from "@/helpers/helper-functions";

import { copyToClipboard } from "../../helpers/helper-functions";

import { LocationCard } from "../LocationCard/LocationCard";
import { LocationType } from "@/helpers/types";
import { LocationCardSeparator } from "../LocationCardSeparator/LocationCardSeparator";

import "./Itinerary.scss";

type ItineraryType = {
  destination: string;
  trip_id: string;
  locations: LocationType;
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
        {Object.entries(locations).map(([name, info], index) => (
          <>
            <LocationCardSeparator />
            <LocationCard key={index} name={name} info={info} />
          </>
        ))}
      </ul>
    </section>
  );
}
