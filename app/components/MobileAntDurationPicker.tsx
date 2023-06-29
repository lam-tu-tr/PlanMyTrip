import React, { useState } from "react";
import { Picker, Button, Space, ConfigProvider } from "antd-mobile";
import enUS from "antd-mobile/es/locales/en-US";

import dayjs from "dayjs";
const durationOptions = [
  [
    { label: "1 day", value: 1 },
    { label: "2 days", value: 2 },
    { label: "3 days", value: 3 },
    { label: "4 days", value: 4 },
    { label: "5 days", value: 5 },
    { label: "6 days", value: 6 },
    { label: "7 days", value: 7 },
  ],
];

type AntProps = {
  startDate: string;
  setEndDate: React.Dispatch<React.SetStateAction<string>>;
};
export default function MobileAntDurationPicker({
  startDate,
  setEndDate,
}: AntProps) {
  const [value, setValue] = useState<string[]>([]);
  return (
    <ConfigProvider locale={enUS}>
      <Picker
        columns={durationOptions}
        value={value}
        onConfirm={(value) => {
          console.log(value);
          setValue([value.toString()]);
          setEndDate(
            dayjs(startDate).add(Number(value), "day").format("MMM DD, YYYY")
          );
        }}
        onSelect={(val, extend) => {
          setValue([value.toString()]);
          console.log("onSelect", val, extend.items);
        }}
      >
        {(items, { open }) => {
          console.log(items);
          return (
            <Button onClick={open}>
              Duration
              {typeof value[0] === "string"
                ? `:  ${value[0]}` + (value[0] == "1" ? " day" : " days")
                : ""}
            </Button>
          );
        }}
      </Picker>
    </ConfigProvider>
  );
}
