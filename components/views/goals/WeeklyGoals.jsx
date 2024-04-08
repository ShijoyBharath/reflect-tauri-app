"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import Database from "tauri-plugin-sql-api";
import {
  formatDate,
  getFormattedDate,
  getCurrentWeek,
  getCurrent12Weeks,
} from "@/utils/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import useTodayStore from "@/components/todayStore";

const WeeklyGoals = () => {
  const [weeklygoals, setWeeklyGoals] = useState({});
  var [weeks, setWeeks] = useState({});
  var [dbGoals, setDBGoals] = useState([]);
  const [curWeek, setCurWeek] = useState([]);
  const {todayGlobal} = useTodayStore();

  useEffect(() => {
    init_table();
  }, [dbGoals]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setWeeklyGoals((prevPlans) => ({
      ...prevPlans,
      [id]: {
        goal: value,
        start_date: weeks[id][0],
        end_date: weeks[id][1],
      },
    }));
  };

  const getCurrent12WeekDates = (start12WeekDate, end12WeekDate) => {
    const data = {};
    var i = 1;
    for (
      var d = new Date(start12WeekDate);
      d <= new Date(end12WeekDate);
      d.setDate(d.getDate() + 7)
    ) {
      var temp_date = new Date(d);
      var week_end = new Date(temp_date.setDate(temp_date.getDate() + 6));

      data[`Week ${i}`] = [formatDate(d), formatDate(week_end), ""];
      dbGoals.forEach((item) => {
        if (
          formatDate(d) === item.start_date &&
          formatDate(week_end) === item.end_date
        ) {
          data[`Week ${i}`] = [formatDate(d), formatDate(week_end), item.goal];
        }
      });
      i = i + 1;
    }
    return data;
  };

  const saveWeeklygoals = () => {
    var dataArray = Object.keys(weeklygoals).map((key) => weeklygoals[key]);
    dataArray.forEach((item) => {
      insert_data(item.goal, item.start_date, item.end_date);
    });
    toast("Saved your weekly goals!", {
      description: getFormattedDate(),
    });
    console.log("saved weekly data");
  };

  async function init_table() {
    try {
      const db = await Database.load("sqlite:data.db");
      const result = await db.execute(
        "CREATE TABLE IF NOT EXISTS weeklygoals (id INTEGER PRIMARY KEY, goal TEXT NOT NULL, start_date TEXT NOT NULL, end_date TEXT NOT NULL)"
      );
      const start_date = await db.select("SELECT * FROM appconfig");

      var weekdates = getCurrent12Weeks(start_date[0].start_date, todayGlobal);
      get_data(weekdates[0], weekdates[1]).then((data) => setDBGoals(data));

      var data = getCurrent12WeekDates(weekdates[0], weekdates[1]);
      setCurWeek(getCurrentWeek(weekdates[0], todayGlobal));
      setWeeks(data);
    } catch (error) {
      console.log("error : ", error);
    }
  }

  async function insert_data(goal, start_date, end_date) {
    try {
      const db = await Database.load("sqlite:data.db");
      const select = await db.select(
        "SELECT * FROM weeklygoals WHERE start_date=? AND end_date=?",
        [start_date, end_date]
      );
      if (select.length === 0) {
        const insert = await db.execute(
          "INSERT INTO weeklygoals (goal, start_date, end_date) VALUES (?, ?, ?)",
          [goal, start_date, end_date]
        );
      } else {
        const update = await db.execute(
          "UPDATE weeklygoals SET goal=? WHERE start_date=? AND end_date=?",
          [goal, start_date, end_date]
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
        "SELECT * FROM weeklygoals WHERE DATE(start_date) BETWEEN DATE(?) AND DATE(?)",
        [start_date, end_date]
      );
      return select;
    } catch (error) {
      console.log("error : ", error);
    }
  }

  return (
    <Card className="border-0 m-4">
      <CardHeader>
        <CardTitle className="flex justify-between gap-5">
          <div className="flex flex-col">
            Weekly Goals
            <CardDescription className="font-medium">
              Your weekly goals that will get you to where you want.
            </CardDescription>
          </div>
          <Button onClick={() => saveWeeklygoals()}>Save</Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="flex flex-col gap-4 pb-6">
          {Object.keys(weeks).map((week) => (
            <div
              key={week}
              className={`p-2 ${
                curWeek[0] == weeks[week][0] && curWeek[1] == weeks[week][1]
                  ? "border-primary border-l-4"
                  : ""
              }`}
            >
              <div
                className="grid w-full max-w-sm items-center gap-1.5"
                key={week}
              >
                <Label className="flex justify-between" htmlFor={week}>
                  {week}
                  <div className="font-light text-xs">
                    {new Date(weeks[week][0]).toLocaleDateString("en-GB")} -{" "}
                    {new Date(weeks[week][1]).toLocaleDateString("en-GB")}
                  </div>
                </Label>
                <Input
                  type="text"
                  id={week}
                  placeholder={
                    weeks[week][2].length === 0
                      ? "Add your weekly goal"
                      : weeks[week][2]
                  }
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

export default WeeklyGoals;
