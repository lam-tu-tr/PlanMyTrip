import { FaRegCopy } from "react-icons/fa";
import { capitalizeWords } from "@/helpers/helper-functions";

import { copyToClipboard } from "../../helpers/helper-functions";

import { LocationDateType } from "@/helpers/types";

import "./Itinerary.scss";
import { ObjAccordion } from "../ObjAccordion/ObjAccordion";
import { Spacer } from "../Spacer/Spacer";

type ItineraryType = {
  destination: string;
  description: string;
  trip_id: string;
  locations: LocationDateType;
};

export function Itinerary({
  destination,
  description,
  trip_id,
  locations,
}: ItineraryType) {
  return (
    <section className="itinerary_container">
      <div className="itinerary__header card_style">
        <span>
          <h1>{capitalizeWords(destination)}</h1>
        </span>
        <p>{description}</p>
      </div>

      <Spacer type={"dashed"} />

      <div className="card_style">
        <button
          title="Copy Trip Link"
          onClick={() => copyToClipboard(trip_id)}
          type="button"
        >
          <FaRegCopy className="w-6 h-6" />
        </button>
      </div>
      <ObjAccordion accordion_obj={locations} />
    </section>
  );
}
