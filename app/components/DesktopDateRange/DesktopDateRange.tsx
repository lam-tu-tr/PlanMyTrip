"use client";

import * as React from "react";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DestinationType } from "@/helpers/types";
import dayjs from "dayjs";

type DesktopDateRangeType = {
  className?: React.HTMLAttributes<HTMLDivElement>;
  destination: DestinationType;
  setDestination: React.Dispatch<React.SetStateAction<DestinationType>>;
};
export function DesktopDateRange({
  className,
  setDestination,
}: DesktopDateRangeType) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });
  const firstRender = React.useRef(true);

  React.useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    if (!date) {
      setDestination((prev) => ({
        ...prev,
        start_date: "",
        end_date: "",
      }));
      return;
    }
    if (date.from) {
      setDestination((prev) => ({
        ...prev,
        start_date: dayjs(date.from).format("MMM DD, YYYY"),
      }));
    }
    if (date.to) {
      setDestination((prev) => ({
        ...prev,

        end_date: dayjs(date.to).format("MMM DD, YYYY"),
      }));
    }
  }, [date, setDestination]);

  return (
    <div className={cn("grid gap-2 h-full ", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal h-full mr-4 text-[1rem] text-white date-range",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <div className="flex justify-around w-full">
                  <span>{format(date.from, "LLL dd, y")}</span> -{" "}
                  <span>{format(date.to, "LLL dd, y")}</span>
                </div>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <div className="flex justify-around w-full">
                <span>Start Date</span> -<span>End Date</span>
              </div>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
