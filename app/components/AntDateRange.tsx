import { useState, FC } from "react";
import { DatePicker, Space } from "antd";

import { RangePickerProps } from "antd/lib/date-picker/generatePicker";
import { RangeValue } from "rc-picker/lib/interface";

import dayjs, { Dayjs } from "dayjs";
const { RangePicker } = DatePicker;

const AntDateRange: FC = () => {
  const [dates, setDates] = useState<string[]>([]);
  console.log(dates);

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
            setDates(
              formatString.map((item) => {
                return dayjs(item).format("MMM DD, YYYY");
              })
            );
          }}
        />
      </Space>
    </div>
  );
};

export default AntDateRange;
