import { useState } from "react";
import { DatePicker } from "antd";
import { RangeValue } from "rc-picker/lib/interface";
import { Dayjs } from "dayjs";
import { destinationType } from "@/helpers/types";

const { RangePicker } = DatePicker;

type AntDateRangeProps = {
  setDest: React.Dispatch<React.SetStateAction<destinationType>>;
};

function AntDateRange({ setDest }: AntDateRangeProps) {
  const [dates, setDates] = useState<RangeValue<Dayjs>>(null);
  const [value, setValue] = useState<RangeValue<Dayjs>>(null);

  //* Limit the date selection range to x days
  const disabledDate = (current: Dayjs) => {
    if (!dates) {
      return false;
    }
    const tooLate = dates[0] && current.diff(dates[0], "days") >= 7;
    const tooEarly = dates[1] && dates[1].diff(current, "days") >= 7;
    return !!tooEarly || !!tooLate;
  };

  const onOpenChange = (open: boolean) => {
    if (open) {
      setDates([null, null]);
    } else {
      setDates(null);
    }
  };

  return (
    <>
      <RangePicker
        id="RangePicker"
        format="MMM DD, YYYY"
        onChange={(date: RangeValue<Dayjs>, formatString: [string, string]) => {
          setDest((prev) => ({
            ...prev,
            start_date: formatString[0],
            end_date: formatString[1],
          }));
        }}
        value={dates || value}
        disabledDate={disabledDate}
        onCalendarChange={(val) => {
          setDates(val);
          setValue(val);
        }}
        onOpenChange={onOpenChange}
        changeOnBlur
      />
    </>
  );
}

export default AntDateRange;
