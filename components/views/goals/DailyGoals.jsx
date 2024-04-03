"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";

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

  const [dailygoals, setDailyGoals] = useState({});
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setDailyGoals((prevPlans) => ({
      ...prevPlans,
      [id]: value,
    }));
  };

  return (
    <div>
      <div className="flex flex-col gap-5 w-[500px] bg-slate-100 p-5 rounded-lg">
        <div className="flex justify-between gap-3">
          <h2>Daily Goals for Week 1</h2>
          <h3>Sunday</h3>
        </div>
        <div>
          <h6>These are your most impactful things you need to get done.</h6>
        </div>
        <div className="flex flex-col gap-4 p-4 pt-8">
          {daysOfWeek.map((day) => (
            <div
              className="grid w-full max-w-sm items-center gap-1.5"
              key={day}
            >
              <Label htmlFor={day}>{day}</Label>
              <Input
                type="text"
                id={day}
                placeholder={"Plans for " + day}
                onChange={handleInputChange}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DailyGoals;
