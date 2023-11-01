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
export default function MobileAntDate({ setDest }: AntMobileProps) {
  const [visible, setVisible] = useState(false);
  const [startDate, setStartDate] = useState("");

  return (
    <div className="home-button">
      <ConfigProvider locale={enUS}>
        <Button
          onClick={() => {
            setVisible(true);
          }}
        >
          StartDate{startDate.length > 0 ? `: ${startDate}` : ``}
        </Button>
        <DatePicker
          visible={visible}
          onClose={() => {
            setVisible(false);
          }}
          precision="day"
          onConfirm={(val) => {
            setStartDate(dayjs(val).format("MMM DD, YYYY"));
            setDest((prev) => ({
              ...prev,
              startDate: dayjs(val).format("MMM DD, YYYY"),
            }));
          }}
        />
      </ConfigProvider>
    </div>
  );
}
