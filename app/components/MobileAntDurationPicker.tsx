import React, { useState } from "react";
import { Picker, Button, ConfigProvider } from "antd-mobile";
import enUS from "antd-mobile/es/locales/en-US";
import { destType } from "../helpers/types";

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
  setDest: React.Dispatch<React.SetStateAction<destType>>;
};
export default function MobileAntDurationPicker({ setDest }: AntProps) {
  const [value, setValue] = useState<string[]>([]);
  return (
    <ConfigProvider locale={enUS}>
      <Picker
        columns={durationOptions}
        value={value}
        onConfirm={(value) => {
          setValue([value.toString()]);
          setDest((prev) => ({
            ...prev,
            duration: value.toString(),
          }));
        }}
        onSelect={(val, extend) => {
          setValue([value.toString()]);
        }}
      >
        {(items, { open }) => {
          return (
            <Button onClick={open}>
              Duration
              {typeof value[0] !== "undefined" && value[0].length > 0
                ? `:  ${value[0]}` + (value[0] == "1" ? " day" : " days")
                : ""}
            </Button>
          );
        }}
      </Picker>
    </ConfigProvider>
  );
}
