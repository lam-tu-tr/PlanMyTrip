import handleSaveToDB from "../hooks/handleSaveToDB";
import { destType } from "@/helpers/types";
import { FiCopy, FiSave } from "react-icons/fi";
import { capitalizeWords } from "@/helpers/helper-functions";
import DOMPurify from "dompurify";

const DOMPurifyConfig = {
  ADD_ATTR: ["target"], //*allow target attribute on anchor tags to go through
};

type ItineraryType = {
  dest: destType;
  currentUser: string | null;
};

export default function Itinerary({ dest, currentUser }: ItineraryType) {
  return (
    <section id="itinerary_container">
      <div>
        <button
          title="Copy Trip Link"
          onClick={() => handleSaveToDB("", dest, currentUser)}
          type="button"
        >
          <FiCopy className="w-full h-full" />
        </button>
        <button
          title="Save to Account"
          onClick={() => handleSaveToDB("save", dest, currentUser)}
          type="button"
        >
          <FiSave className="w-full h-full" />
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
