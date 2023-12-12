import { destinationType } from "@/helpers/types";
import { FiCopy } from "react-icons/fi";
import { capitalizeWords } from "@/helpers/helper-functions";
import DOMPurify from "isomorphic-dompurify";

import "./Itinerary.scss";

const DOMPurifyConfig = {
  ADD_ATTR: ["target"], //*allow target attribute on anchor tags to go through
};

type ItineraryType = {
  aiMessage: string;
  destination: string;
};

export function Itinerary({ aiMessage, destination }: ItineraryType) {
  //
  return (
    <section id="itinerary_container">
      {/* <div>
        <button
          title="Copy Trip Link"
          onClick={() => handleSaveToDB(dest)}
          type="button"
        >
          <FiCopy className="w-full h-full" />
        </button>
      </div> */}

      <h1>Trip to {capitalizeWords(destination!)}</h1>

      <section
        className="itinerary"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(aiMessage, DOMPurifyConfig),
        }}
      ></section>
    </section>
  );
}
