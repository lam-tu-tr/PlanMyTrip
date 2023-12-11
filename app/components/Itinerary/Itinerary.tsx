import { handleSaveToDB } from "@/routes/trip-details/helpers/handleSaveToDB";
import { destType } from "@/helpers/types";
import { FiCopy } from "react-icons/fi";
import { capitalizeWords } from "@/helpers/helper-functions";
import DOMPurify from "dompurify";

import "./Itinerary.scss";

const DOMPurifyConfig = {
  ADD_ATTR: ["target"], //*allow target attribute on anchor tags to go through
};

type ItineraryType = {
  dest: destType;
};

export function Itinerary({ dest }: ItineraryType) {
  return (
    <section id="itinerary_container">
      <div>
        <button
          title="Copy Trip Link"
          onClick={() => handleSaveToDB(dest)}
          type="button"
        >
          <FiCopy className="w-full h-full" />
        </button>
      </div>

      <h1>Trip to {capitalizeWords(dest.destName!)}</h1>

      <section
        className="itinerary"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(dest.aiMessage, DOMPurifyConfig),
        }}
      ></section>
    </section>
  );
}
