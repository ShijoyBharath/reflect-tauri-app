import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

const WeeklyGoals = () => {
  const weeks = Array.from({ length: 12 }, (_, index) => `Week ${index + 1}`);

  return (
    <div>
      <div className="flex flex-col gap-5 w-[500px] bg-slate-100 p-5 rounded-lg">
        <div className="flex justify-between gap-3">
          <h2>Weekly Goals</h2>
          <h3>Week 1</h3>
        </div>
        <div className="flex flex-col gap-4 p-4 pt-8">
          {weeks.map((week) => (
            <div className="grid w-full max-w-sm items-center gap-1.5" key={week}>
              <Label htmlFor={week}>{week}</Label>
              <Input type="text" id={week} placeholder={"Plans for " + week} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeeklyGoals;
