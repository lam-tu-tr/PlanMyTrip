import React, { useState } from "react";
import { Button, DatePicker, ConfigProvider } from "antd-mobile";
import enUS from "antd-mobile/es/locales/en-US";

import dayjs from "dayjs";
import { destType } from "../helpers/types";

type AntProps = {
  dest: destType;
  setDest: React.Dispatch<React.SetStateAction<destType>>;
};

export default function MobileAntDate({ dest, setDest }: AntProps) {
  const [visible1, setVisible1] = useState(false);
  return (
    <div>
      <ConfigProvider locale={enUS}>
        <Button
          onClick={() => {
            setVisible1(true);
          }}
        >
          StartDate{dest.startDate.length > 0 ? `: ${dest.startDate}` : ``}
        </Button>
        <DatePicker
          visible={visible1}
          onClose={() => {
            setVisible1(false);
          }}
          precision="day"
          onConfirm={(val) =>
            setDest((prev) => ({
              ...prev,
              startDate: dayjs(val).format("MMM DD, YYYY"),
            }))
          }
        />
      </ConfigProvider>
    </div>
  );
}
