import { FaRegCopy } from "react-icons/fa";
import { capitalizeWords } from "@/helpers/helper-functions";

import { copyToClipboard } from "../../helpers/helper-functions";
import "./Itinerary.scss";
import { LocationCard } from "../LocationCard/LocationCard";

const DOMPurifyConfig = {
  ADD_ATTR: ["target"], //*allow target attribute on anchor tags to go through
};

type ItineraryType = {
  destination: string;
  trip_id: string;
};

export function Itinerary({ destination, trip_id }: ItineraryType) {
  //
  return (
    <section id="itinerary_container">
      <div>
        <h1>Trip to {capitalizeWords(destination!)}</h1>
        <button
          title="Copy Trip Link"
          onClick={() => copyToClipboard(trip_id)}
          type="button"
        >
          <FaRegCopy className="w-6 h-6" />
        </button>
      </div>

      <section
        className="itinerary"
        // dangerouslySetInnerHTML={{
        //   __html: DOMPurify.sanitize(ai_message, DOMPurifyConfig),
        // }}
      >
        <LocationCard />
      </section>
    </section>
  );
}
