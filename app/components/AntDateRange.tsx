import React, { useState, FC } from "react";
import { DatePicker, Space } from "antd";

// import { RangePickerProps } from "antd/lib/date-picker/generatePicker";
import { RangeValue } from "rc-picker/lib/interface";

import dayjs, { Dayjs } from "dayjs";
import { Message } from "../helpers/types";
const { RangePicker } = DatePicker;

type AntDateRangeProps = {
  setDate: React.Dispatch<React.SetStateAction<string[]>>;
  setMessages: any;
};

function AntDateRange({ setDate, setMessages }: AntDateRangeProps) {
  // const [dates, setDates] = useState<string[]>([]);
  // console.log(dates);

  return (
    <div className="bg-blue-500 w-96 h-14 flex flex-row justify-center items-center">
      <Space direction="vertical" size={12}>
        <RangePicker
          className="w-96 h-14"
          format="MMM DD, YYYY"
          onChange={(
            date: RangeValue<Dayjs>,
            formatString: [string, string]
          ) => {
            setDate(
              formatString.map((item) => {
                return dayjs(item).format("MMM DD, YYYY");
              })
            );

            // setMessages((prev: any) => {
            //   const user = prev.find((item: Message) => item.role === "user");

            //   return [
            //     ...prev,
            //     {
            //       ...user,
            //       content: formatString.map((item) => {
            //         return dayjs(item).format("MMM DD, YYYY");
            //       }),
            //     },
            //   ];
            // });
          }}
        />
      </Space>
    </div>
  );
}

export default AntDateRange;
