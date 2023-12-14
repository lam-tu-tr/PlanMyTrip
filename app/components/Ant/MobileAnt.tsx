import { useEffect } from "react";

import MobileAntDate from "./MobileAntDate";
import MobileAntDurationPicker from "./MobileAntDurationPicker";

import { AntMobileProps, DestinationType } from "@/helpers/types";
import dayjs from "dayjs";
import "./Ant.scss";

type extendedAntMobileProps = AntMobileProps & { dest: DestinationType };

export default function MobileAnt({ dest, setDest }: extendedAntMobileProps) {
  //* Set end date based on selected duration for mobile
  useEffect(() => {
    if (dest.duration > 0 && dest.start_date.length > 0) {
      setDest((prev) => ({
        ...prev,
        endDate: dayjs(dest.start_date)
          .add(Number(dest.duration), "day")
          .format("MMM DD, YYYY"),
      }));
    }
  }, [dest.duration, dest.start_date, setDest]);

  return (
    <div>
      <MobileAntDate setDest={setDest} />

      <MobileAntDurationPicker setDest={setDest} />
      <div
        className={` home-button
            ${
              dest.end_date.length == 0
                ? "border-dashed border-white border-2 text-[##dfdfdf]"
                : "bg-white color"
            }
          `}
      >
        {dest.end_date.length !== 0
          ? `End Date: ${dest.end_date}`
          : `End Date `}
      </div>
    </div>
  );
}
