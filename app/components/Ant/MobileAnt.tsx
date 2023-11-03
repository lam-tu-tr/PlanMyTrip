import { useEffect } from "react";

import MobileAntDate from "./MobileAntDate";
import MobileAntDurationPicker from "./MobileAntDurationPicker";

import { AntMobileProps, destType } from "@/helpers/types";
import dayjs from "dayjs";
import "./Ant.scss";

type extendedAntMobileProps = AntMobileProps & { dest: destType };

export default function MobileAnt({ dest, setDest }: extendedAntMobileProps) {
  //* Set end date based on selected duration for mobile
  useEffect(() => {
    if (dest.duration.length > 0 && dest.startDate.length > 0) {
      setDest((prev) => ({
        ...prev,
        endDate: dayjs(dest.startDate)
          .add(Number(dest.duration), "day")
          .format("MMM DD, YYYY"),
      }));
    }
  }, [dest.duration, dest.startDate, setDest]);

  return (

    <div>

      <MobileAntDate setDest={setDest} />

      <MobileAntDurationPicker setDest={setDest} />
      <div
        className={` home-button
            ${
              dest.endDate.length == 0
                ? "border-dashed border-white border-2 text-[##dfdfdf]"
                : "bg-white color"

            }
          `}
      >
        {dest.endDate.length !== 0 ? `End Date: ${dest.endDate}` : `End Date `}
      </div>
    </div>
  );
}
