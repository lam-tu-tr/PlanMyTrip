import { useState } from "react";
import { Button, DatePicker, ConfigProvider } from "antd-mobile";
import enUS from "antd-mobile/es/locales/en-US";

import dayjs from "dayjs";
import { AntMobileProps } from "@/helpers/types";
// const MobileAntDate = dynamic(() => import("./components/MobileAntDate"), {
//   ssr: false,
// });
// const MobileAntDurationPicker = dynamic(
//   () => import("./components/MobileAntDurationPicker"),
//   {
//     ssr: false,
//   }
// );
export default function MobileAntDate({ setDestination }: AntMobileProps) {
  const [visible, setVisible] = useState(false);
  const [startDate, setStartDate] = useState("");

  return (
    <div
      className={`home-button ${
        startDate.length == 0 ? "pre-select-color" : ""
      }`}
    >
      <ConfigProvider locale={enUS}>
        <Button
          onClick={() => {
            setVisible(true);
          }}
        >
          Start Date{startDate.length > 0 ? `: ${startDate}` : ``}
        </Button>

        <DatePicker
          visible={visible}
          onClose={() => {
            setVisible(false);
          }}
          precision="day"
          onConfirm={(val) => {
            setStartDate(dayjs(val).format("MMM DD, YYYY"));
            setDestination((prev) => ({
              ...prev,
              start_date: dayjs(val).format("MMM DD, YYYY"),
            }));
          }}
        />
      </ConfigProvider>
    </div>
  );
}
