"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";

import { invoke } from "@tauri-apps/api/tauri";
import { Button } from "@/components/ui/button";

const WeeklyGoals = () => {
  const [weeklygoals, setWeeklyGoals] = useState({});

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setWeeklyGoals((prevPlans) => ({
      ...prevPlans,
      [id]: {
        goal: value,
        start_date: next12Weeks[id][0],
        end_date: next12Weeks[id][1],
      },
    }));
  };

  function getNext12Weeks(startDate) {
    const next12Weeks = {};

    // Clone the start date to avoid mutating it
    const currentDate = new Date(startDate);

    // Iterate for the next 12 weeks
    for (let i = 1; i <= 12; i++) {
      // Calculate start date of the week
      const startOfWeek = new Date(currentDate);
      startOfWeek.setDate(startOfWeek.getDate() + (i - 1) * 7);

      // Calculate end date of the week
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);

      // Add start date and end date to the result object
      next12Weeks[`Week ${i}`] = [
        formatDate(startOfWeek),
        formatDate(endOfWeek),
      ];
    }

    return next12Weeks;
  }

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  // Example usage:
  const startDate = new Date(); // Example date (Friday)
  const next12Weeks = getNext12Weeks(startDate);
  // console.log(next12Weeks);
  // console.log(weeklygoals);

  const saveWeeklygoals = () => {
    var dataArray = Object.keys(weeklygoals).map(key => weeklygoals[key]);
    dataArray = JSON.stringify(dataArray)
    invoke("insert_weeklygoals_data", {
      goals_array : dataArray
    });
  };

  const [tuariget, setTauriget] = useState("");
  useEffect(() => {
    // invoke("get_weeklygoals_data", {
    //   start_date: "2024-05-07",
    //   end_date: "2024-05-18",
    // }).then((message) => setTauriget(message));
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-5 w-[500px] bg-slate-100 p-5 rounded-lg">
        <div className="flex justify-between gap-3">
          <h2>Weekly Goals</h2>
          <h1>{tuariget}</h1>
          <Button onClick={() => saveWeeklygoals()}>Save</Button>
        </div>
        <div className="flex flex-col gap-4 p-4 pt-8">
          {Object.keys(next12Weeks).map((week) => (
            <div
              className="grid w-full max-w-sm items-center gap-1.5"
              key={week}
            >
              <Label htmlFor={week}>{week + " " + next12Weeks[week][0]}</Label>
              <Input
                type="text"
                id={week}
                placeholder={"Plans for " + week}
                onChange={handleInputChange}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeeklyGoals;
