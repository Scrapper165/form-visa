"use client";

import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
// import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import Calendar, { CalendarProps } from "react-calendar";
import "react-calendar/dist/Calendar.css";
interface Props extends CalendarProps {
  date: Date | undefined;
  setDate: (date: Date) => void;
}
export function DatePicker2({
  date,
  setDate,
  activeStartDate,
  ...rest
}: Props) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full  justify-start text-left font-normal border-2 border-black focus:ring-2 focus:border-white focus:ring-offset-0 focus:ring-primary focus:bg-light-primary flex h-10 rounded-lg bg-white px-3 py-2 text-sm  file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus:outline-none  disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            format(date || new Date(), "yyyy-MM-dd")
          ) : (
            <span>Chọn ngày</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          onChange={(date) => setDate((date ?? new Date())! as Date)}
          locale="vi"
          value={date}
          {...rest}
        />
      </PopoverContent>
    </Popover>
  );
}
