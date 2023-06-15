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
  return (
    <div className=" w-96 h-14 flex flex-row justify-center items-center ml-8">
      <Space direction="vertical" size={12}>
        <RangePicker
          transitionName=""
          className="w-96 h-10"
          format="MMM DD, YYYY"
          onChange={(
            date: RangeValue<Dayjs>,
            formatString: [string, string]
          ) => {
            setStartDate(formatString[0]);
            setEndDate(formatString[1]);
          }}
        />
      </Space>
    </div>
  );
}

export default AntDateRange;
