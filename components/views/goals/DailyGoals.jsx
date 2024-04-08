"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { formatDate, getFormattedDate, getCurrentWeek, getCurrent12Weeks } from "@/utils/utils";

import Database from "tauri-plugin-sql-api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";

const DailyGoals = () => {
  const [dailygoals, setDailyGoals] = useState({});
  var [days, setDays] = useState({});
  var [dbGoals, setDBGoals] = useState([]);
  const today = formatDate(new Date());

  useEffect(() => {
    init_table();
  }, [dbGoals]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setDailyGoals((prevPlans) => ({
      ...prevPlans,
      [id]: {
        goal: value,
        date: days[id][0],
      },
    }));
  };

  const getThisWeekDates = (startDate) => {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const thisWeekDates = {};

    // Clone the start date to avoid mutating it
    const currentDate = new Date(startDate);

    // Iterate for the next 7 days
    for (let i = 0; i < 7; i++) {
      const day = daysOfWeek[currentDate.getDay()];
      const date = String(currentDate.getDate()).padStart(2, "0");
      const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Month is zero-based, so we add 1
      const year = currentDate.getFullYear();

      thisWeekDates[day] = [`${year}-${month}-${date}`, ""];
      dbGoals.forEach((item) => {
        if (item.date === `${year}-${month}-${date}`) {
          thisWeekDates[day] = [`${year}-${month}-${date}`, item.goal];
        }
      });

      // Increment the date for the next day
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return thisWeekDates;
  };

  const saveDailygoals = () => {
    var dataArray = Object.keys(dailygoals).map((key) => dailygoals[key]);
    dataArray.forEach((item) => {
      insert_data(item.goal, item.date);
    });
    toast("Saved your daily goals!", {
      description: getFormattedDate(),
    });
    console.log("saved daily data");
  };

  async function init_table() {
    try {
      const db = await Database.load("sqlite:data.db");
      const result = await db.execute(
        "CREATE TABLE IF NOT EXISTS dailygoals (id INTEGER PRIMARY KEY, goal TEXT NOT NULL, date TEXT NOT NULL)"
      );
      const start_date = await db.select("SELECT * FROM appconfig");

      var weekdates = getCurrent12Weeks(start_date[0].start_date);
      var thisweek = getCurrentWeek(weekdates[0]);
      get_data(thisweek[0], thisweek[1]).then((data) => setDBGoals(data));

      var data = getThisWeekDates(thisweek[0], thisweek[1]);
      setDays(data);
    } catch (error) {
      console.log("error : ", error);
    }
  }

  async function insert_data(goal, date) {
    try {
      const db = await Database.load("sqlite:data.db");
      const select = await db.select("SELECT * FROM dailygoals WHERE date=?", [
        date,
      ]);
      if (select.length === 0) {
        const insert = await db.execute(
          "INSERT INTO dailygoals (goal, date) VALUES (?, ?)",
          [goal, date]
        );
      } else {
        const update = await db.execute(
          "UPDATE dailygoals SET goal=? WHERE date=?",
          [goal, date]
        );
      }
    } catch (error) {
      console.log("error : ", error);
    }
  }

  async function get_data(start_date, end_date) {
    try {
      const db = await Database.load("sqlite:data.db");
      const select = await db.select(
        "SELECT * FROM dailygoals WHERE DATE(date) BETWEEN DATE(?) AND DATE(?)",
        [start_date, end_date]
      );
      return select;
    } catch (error) {
      console.log("error : ", error);
    }
  }

  return (
    <Card className="border-0 m-4 h-fit">
      <CardHeader>
        <CardTitle className="flex justify-between gap-5">
          <div className="flex flex-col">
            Daily Goals
            <CardDescription className="font-medium">
              Most impactful things that you need to get done each day.
            </CardDescription>
          </div>
          <Button onClick={() => saveDailygoals()}>Save</Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="flex flex-col gap-4 pb-6">
          {Object.keys(days).map((day) => (
            <div
              key={day}
              className={`p-2 ${
                days[day][0] == today ? "border-l-4 border-primary" : ""
              }`}
            >
              <div
                className="grid w-full max-w-sm items-center gap-1.5"
                key={day}
              >
                <Label className="flex justify-between" htmlFor={day}>
                  {day}
                  <div className="font-light text-xs">{new Date(days[day][0]).toLocaleDateString('en-GB')}</div>
                </Label>
                <Input
                  type="text"
                  id={day}
                  placeholder={days[day][1] ? days[day][1] : "Add your daily goal"}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyGoals;
