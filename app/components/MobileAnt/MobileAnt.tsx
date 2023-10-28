import { useEffect } from "react";

import { AntProps } from "../../helpers/types";
import MobileAntDate from "./MobileAntDate";
import MobileAntDurationPicker from "./MobileAntDurationPicker";
import dayjs from "dayjs";

export default function MobileAnt({ dest, setDest }: AntProps) {
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
  }, [dest.duration, dest.startDate]);

  return (
    <div id="choice-wrapper">
      <MobileAntDate dest={dest} setDest={setDest} />

      <MobileAntDurationPicker setDest={setDest} />
      <span
        className={
          dest.endDate.length !== 0
            ? "bg-white"
            : "border-dashed border-white border-2"
        }
      >
        {dest.endDate.length !== 0 ? `End Date: ${dest.endDate}` : `End Date `}
      </span>
    </div>
  );
}
