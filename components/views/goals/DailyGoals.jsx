import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

const DailyGoals = () => {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <div>
      <div className="flex flex-col gap-5 w-[500px] bg-slate-100 p-5 rounded-lg">
        <div className="flex justify-between gap-3">
          <h2>Daily Goals</h2>
          <h3>Sunday</h3>
        </div>
        <div className="flex flex-col gap-4 p-4 pt-8">
          {daysOfWeek.map((day) => (
            <div className="grid w-full max-w-sm items-center gap-1.5" key={day}>
              <Label htmlFor={day}>{day}</Label>
              <Input type="text" id={day} placeholder={"Plans for " + day} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DailyGoals;
