"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";

import { invoke } from "@tauri-apps/api/tauri";

import Database from "tauri-plugin-sql-api";

const DailyGoals = () => {

  async function loadDB() {
    try {

      const db = await Database.load('sqlite:test.db');
      const result = await db.execute("CREATE TABLE IF NOT EXISTS person (id INTEGER PRIMARY KEY, name  TEXT NOT NULL)");
      const insert = await db.execute("INSERT INTO person (name) VALUES (?)", ["shijoy"])
    } catch (error) {
      console.log("error : ", error)
    }
  }
  loadDB();

  const [dailygoals, setDailyGoals] = useState({});
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setDailyGoals((prevPlans) => ({
      ...prevPlans,
      [id]: value,
    }));
  };

  function getNextWeekDays(startDate) {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const nextWeekDays = [];

    // Clone the start date to avoid mutating it
    const currentDate = new Date(startDate);

    // Iterate for the next 7 days
    for (let i = 0; i < 7; i++) {
      const day = daysOfWeek[currentDate.getDay()];
      const date = currentDate.getDate();
      const month = currentDate.getMonth() + 1; // Month is zero-based, so we add 1
      const year = currentDate.getFullYear();

      nextWeekDays.push([day, `${year}-${month}-${date}`]);

      // Increment the date for the next day
      currentDate.setDate(currentDate.getDate() + 1);
    }

    const today = new Date();

    return [nextWeekDays, daysOfWeek[today.getDay()]];
  }

  // Example usage:
  const startDate = new Date(); // Use today's date as the start date
  const [nextWeekDays, today] = getNextWeekDays(startDate);
  // console.log(nextWeekDays);
  // console.log(dailygoals);


  return (
    <div>
      <div className="flex flex-col gap-5 w-[500px] bg-slate-100 p-5 rounded-lg">
        <div className="flex justify-between gap-3">
          <h2>Daily Goals for Week 1</h2>
          <h3>{"path"}</h3>
        </div>
        <div>
          <h6>These are your most impactful things you need to get done.</h6>
        </div>
        <div className="flex flex-col gap-4 p-4 pt-8">
          {nextWeekDays.map((day) => (
            <div
              className="grid w-full max-w-sm items-center gap-1.5"
              key={day[0]}
            >
              <Label htmlFor={day[0]}>{day[0]}</Label>
              <Input
                type="text"
                id={day[0]}
                placeholder={"Plans for " + day[0] + " " + day[1]}
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
