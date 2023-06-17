"use client";
import React, { useState, FC } from "react";
import { DatePicker, Space } from "antd";

// import { RangePickerProps } from "antd/lib/date-picker/generatePicker";
import { RangeValue } from "rc-picker/lib/interface";
import { Dayjs } from "dayjs";

const { RangePicker } = DatePicker;

type AntDateRangeProps = {
  setStartDate: React.Dispatch<React.SetStateAction<string>>;
  setEndDate: React.Dispatch<React.SetStateAction<string>>;
};

function AntDateRange({ setStartDate, setEndDate }: AntDateRangeProps) {
  const [dates, setDates] = useState<RangeValue<Dayjs>>(null);
  const [value, setValue] = useState<RangeValue<Dayjs>>(null);

  const disabledDate = (current: Dayjs) => {
    if (!dates) {
      return false;
    }
    const tooLate = dates[0] && current.diff(dates[0], "days") >= 3;
    const tooEarly = dates[1] && dates[1].diff(current, "days") >= 3;
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
    <div className=" w-96 h-14 flex flex-row justify-center items-center ml-8">
      <Space direction="vertical" size={12}>
        <RangePicker
          transitionName=""
          className="w-96 h-10"
          format="MMM DD, YYYY"
          value={dates || value}
          disabledDate={disabledDate}
          onCalendarChange={(val) => {
            setDates(val);
          }}
          // onChange={(val) => {
          //   setValue(val);
          // }}
          onChange={(
            date: RangeValue<Dayjs>,
            formatString: [string, string]
          ) => {
            setStartDate(formatString[0]);
            setEndDate(formatString[1]);
          }}
          onOpenChange={onOpenChange}
          changeOnBlur
        />
      </Space>
    </div>
  );
}

export default AntDateRange;
