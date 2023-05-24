import { FC } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import styles from "./styles/ReactDatePicker.module.css";

interface DatePickerProps {
  startDate: Date;
  endDate: Date;
  setStartDate: (date: Date) => void;
  setEndDate: (date: Date) => void;
}

const ReactDatePicker: FC<DatePickerProps> = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}) => {
  return (
    <div className="bg-blue-500 w-96 h-14 flex flex-row justify-between items-center">
      <div>
        <DatePicker
          selected={startDate}
          onChange={(date: Date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          className={styles.datePicker}
        />
      </div>
      <aside className="text-white">~</aside>
      <div>
        <DatePicker
          selected={endDate}
          onChange={(date: Date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          className={styles.datePicker}
        />
      </div>
    </div>
  );
};

export default ReactDatePicker;
