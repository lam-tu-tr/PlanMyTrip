import React, { useState } from "react";
import { Button, DatePicker, ConfigProvider } from "antd-mobile";
import enUS from "antd-mobile/es/locales/en-US";

import dayjs from "dayjs";

type AntProps = {
  startDate: string;
  setStartDate: React.Dispatch<React.SetStateAction<string>>;
};

export default function MobileAntDate({ startDate, setStartDate }: AntProps) {
  const [visible1, setVisible1] = useState(false);
  return (
    <div>
      <ConfigProvider locale={enUS}>
        <Button
          onClick={() => {
            setVisible1(true);
          }}
        >
          StartDate{startDate.length > 0 ? `: ${startDate}` : ``}
        </Button>
        <DatePicker
          visible={visible1}
          onClose={() => {
            setVisible1(false);
          }}
          precision="day"
          onConfirm={(val) => setStartDate(dayjs(val).format("MMM DD, YYYY"))}
        />
      </ConfigProvider>
    </div>
  );
}
