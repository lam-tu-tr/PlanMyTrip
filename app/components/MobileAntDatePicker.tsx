import React, { useState } from "react";
import { Button, DatePicker, Space, ConfigProvider } from "antd-mobile";
import enUS from "antd-mobile/es/locales/en-US";

import dayjs from "dayjs";
const now = new Date();

type AntProps = {
  startDate: string;
  setStartDate: React.Dispatch<React.SetStateAction<string>>;
};
export default function MobileAntDatePicker({
  startDate,
  setStartDate,
}: AntProps) {
  const [visible, setVisible] = useState(false);

  return (
    <ConfigProvider locale={enUS}>
      <Button
        id="datebutton"
        onClick={() => {
          setVisible(true);
        }}
      >
        Start Date {startDate.length > 0 ? `: ${startDate}` : ``}
      </Button>

      <DatePicker
        className="ant-picker-text"
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
        onConfirm={(val) => setStartDate(dayjs(val).format("MMM DD, YYYY"))}
        defaultValue={now}
        max={now}
      >
        {() => ""}
      </DatePicker>
    </ConfigProvider>
  );
}
