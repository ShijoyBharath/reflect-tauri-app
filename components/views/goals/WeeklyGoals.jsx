"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import Database from "tauri-plugin-sql-api";

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

    // Convert the startDate to a Date object
    startDate = new Date(startDate);
    
    // Get today's date
    const today = new Date();
    
    // Calculate the difference in milliseconds between today and startDate
    const differenceInMilliseconds = today - startDate;
    
    // Calculate the difference in days
    const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
    
    // Calculate the remainder when dividing the difference by 7
    const remainder = differenceInDays % 7;
    
    // Calculate the number of days to subtract to get to the previous 7th multiple date
    const daysToSubtract = remainder === 0 ? 0 : 7 - remainder;
    
    // Create a new date by subtracting the days
    const previous7thMultipleDate = new Date(today);
    previous7thMultipleDate.setDate(today.getDate() - daysToSubtract);
    
    // console.log(previous7thMultipleDate);

    // Clone the start date to avoid mutating it
    const currentDate = new Date(previous7thMultipleDate);

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
  const [startDate, setStartDate] = useState("") // Example date (Friday)
  const next12Weeks = getNext12Weeks(startDate);


  const getCurrentWeek = (startDate) => {
    const today = new Date();
    for (var d = new Date(startDate); d <= today; d.setDate(d.getDate() + 7)) {
      var temp_date = new Date(d)
      var week_start = new Date(d)
      var week_end = new Date(temp_date.setDate(temp_date.getDate() + 6))

      if (today >= week_start && today <= week_end) {
        return [formatDate(week_start), formatDate(week_end)]
      }
    }
  }
  console.log(getCurrentWeek(startDate));

  // console.log(next12Weeks);
  // console.log(weeklygoals);

  const saveWeeklygoals = () => {
    var dataArray = Object.keys(weeklygoals).map(key => weeklygoals[key]);
    dataArray.forEach((item)=> {
      insert_data(item.goal, item.start_date, item.end_date)
    })
    console.log("saved weekly data")
  };

  useEffect(() => {
    init_table().then((data)=>setStartDate(data))
    // const weeklygoalsdata = get_data()
    // console.log(weeklygoalsdata)
  }, []);

  async function init_table() {
    try {
      const db = await Database.load('sqlite:data.db');
      const result = await db.execute("CREATE TABLE IF NOT EXISTS weeklygoals (id INTEGER PRIMARY KEY, goal TEXT NOT NULL, start_date TEXT NOT NULL, end_date TEXT NOT NULL)");
      const start_date = await db.select("SELECT * FROM appconfig")
      return start_date[0].start_date
    } catch (error) {
      console.log("error : ", error)
    }
  }

  async function insert_data(goal, start_date, end_date) {
    try {
      const db = await Database.load('sqlite:data.db');
      const select = await db.select("SELECT * FROM weeklygoals WHERE start_date=? AND end_date=?", [start_date, end_date]);
      if(select.length === 0) {
        const insert = await db.execute("INSERT INTO weeklygoals (goal, start_date, end_date) VALUES (?, ?, ?)", [goal, start_date, end_date]);
      } else {
        const update = await db.execute("UPDATE weeklygoals SET goal=? WHERE start_date=? AND end_date=?", [goal, start_date, end_date]);
      }
    } catch (error) {
      console.log("error : ", error)
    }
  }

  async function get_data(start_date, end_date) {
    try {
      const db = await Database.load('sqlite:data.db');
      const select = await db.select("SELECT * FROM weeklygoals WHERE DATE(start_date) BETWEEN DATE(?) AND DATE(?)", [start_date, end_date]);
      return select
    } catch (error) {
      console.log("error : ", error)
    }
  }

  return (
    <div>
      <div className="flex flex-col gap-5 w-[500px] bg-slate-100 p-5 rounded-lg">
        <div className="flex justify-between gap-3">
          <h2>Weekly Goals</h2>
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
