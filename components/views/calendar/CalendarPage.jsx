"use client";
import React from "react";
import { Calendar } from "@/components/ui/calendar";

const CalendarPage = () => {
  const [date, setDate] = React.useState(new Date());
  return (
    <div className="flex m-3 p-5 gap-3 justify-center items-center bg-slate-200 rounded-lg">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border bg-white"
      />
    </div>
  );
};

export default CalendarPage;
