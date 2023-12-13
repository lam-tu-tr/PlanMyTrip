import { FaRegCopy } from "react-icons/fa";
import { capitalizeWords } from "@/helpers/helper-functions";
import DOMPurify from "isomorphic-dompurify";

import { copyToClipboard } from "../../helpers/helper-functions";
import "./Itinerary.scss";

const DOMPurifyConfig = {
  ADD_ATTR: ["target"], //*allow target attribute on anchor tags to go through
};

type ItineraryType = {
  aiMessage: string;
  destination: string;
  trip_id: string;
};

export function Itinerary({ aiMessage, destination, trip_id }: ItineraryType) {
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
          <FaRegCopy className="w-full h-full" />
        </button>
      </div>

      <section
        className="itinerary"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(aiMessage, DOMPurifyConfig),
        }}
      ></section>
    </section>
  );
}
