"use client";
import React from "react";
import { Calendar } from "@/components/ui/calendar";

const CalendarPage = () => {
  const [date, setDate] = React.useState(new Date());

  // const now = new Date();
  // var day = now.getDate();
  // var monthIndex = now.getMonth();
  // var year = now.getFullYear();

  return (
    <div className="flex flex-col m-3 p-5 gap-3 justify-between items-center  bg-slate-200 rounded-lg">
      <Calendar
        // defaultMonth={new Date(year, monthIndex)}
        numberOfMonths={3}
        showOutsideDays={false}
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border bg-white"
      />
    </div>
  );
};

export default CalendarPage;
