import React, { useState } from "react";
import { Picker, Button, ConfigProvider } from "antd-mobile";
import enUS from "antd-mobile/es/locales/en-US";
import { AntMobileProps } from "@/helpers/types";

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

export default function MobileAntDurationPicker({
  setDestination,
}: AntMobileProps) {
  const [value, setValue] = useState<string[]>([]);
  return (
    <div
      className={`home-button ${value.length == 0 ? "pre-select-color" : ""}`}
    >
      <ConfigProvider locale={enUS}>
        <Picker
          columns={durationOptions}
          value={value}
          onConfirm={(value) => {
            setValue([value.toString()]);
            setDestination((prev) => ({
              ...prev,
              duration: Number(value),
            }));
          }}
          // onSelect={(val, extend) => {
          //   // setValue([value.toString()]);
          // }}
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
    </div>
  );
}
