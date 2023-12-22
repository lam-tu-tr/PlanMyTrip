import { useEffect } from "react";

import MobileAntDate from "./MobileAntDate";
import MobileAntDurationPicker from "./MobileAntDurationPicker";

import { AntMobileProps, DestinationType } from "@/helpers/types";
import dayjs from "dayjs";
import "./Ant.scss";

type extendedAntMobileProps = AntMobileProps & { destination: DestinationType };

export default function MobileAnt({
  destination,
  setDestination,
}: extendedAntMobileProps) {
  //* Set end date based on selected duration for mobile
  useEffect(() => {
    if (destination.duration > 0 && destination.start_date.length > 0) {
      setDestination((prev) => ({
        ...prev,
        end_date: dayjs(destination.start_date)
          .add(Number(destination.duration - 1), "day")
          .format("MMM DD, YYYY"),
      }));
    }
  }, [destination.duration, destination.start_date, setDestination]);

  return (
    <div>
      <MobileAntDate setDestination={setDestination} />

      <MobileAntDurationPicker setDestination={setDestination} />
      <div
        className={` home-button
            ${
              destination.end_date.length == 0
                ? "border-dashed border-white border-2 text-[##dfdfdf]"
                : "bg-white color"
            }
          `}
      >
        {destination.end_date.length !== 0
          ? `End Date: ${destination.end_date}`
          : `End Date `}
      </div>
    </div>
  );
}
