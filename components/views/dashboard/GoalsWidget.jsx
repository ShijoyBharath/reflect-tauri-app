"use client";
import React, { useState, useEffect } from "react";
import Database from "tauri-plugin-sql-api";
import { formatDate, getCurrent12Weeks } from "@/utils/utils";
import { Badge } from "@/components/ui/badge";
import useTodayStore from "@/components/todayStore";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const GoalsWidget = () => {
  const { todayGlobal } = useTodayStore();

  function calculateDaysLeft(startDateStr, endDateStr) {
    // Convert the string dates to Date objects
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);

    // Calculate the difference in milliseconds between the end date and the start date
    const differenceInMilliseconds = endDate - startDate;

    // Convert the difference to days
    const daysLeft = Math.ceil(
      differenceInMilliseconds / (1000 * 60 * 60 * 24)
    );

    return daysLeft;
  }

  const [data, setData] = useState([]);
  async function get_data() {
    try {
      const today = formatDate(todayGlobal);
      const db = await Database.load("sqlite:data.db");
      const select_daily = await db.select(
        "SELECT * FROM dailygoals WHERE date=?",
        [today]
      );
      const select_weekly = await db.select(
        "SELECT * FROM weeklygoals WHERE start_date<=? AND end_date>=?",
        [today, today]
      );

      const start_date = await db.select("SELECT * FROM appconfig");
      var current12week = getCurrent12Weeks(
        start_date[0].start_date,
        todayGlobal
      );
      var daysleft = calculateDaysLeft(today, current12week[1]);

      var daily =
        select_daily.length !== 0 ? select_daily[0].goal : "No goals for today. Add a daily goal!";
      var weekly =
        select_weekly.length !== 0
          ? select_weekly[0].goal
          : "No goals this week. Add a weekly goal!";

      setData([daily, weekly, daysleft])

    } catch (error) {
      console.log("error : ", error);
    }
  }
  useEffect(() => {
    get_data()
  }, []);

  return (
    <div className="flex flex-col gap-4 m-4 p-9 justify-between bg-background rounded-lg">
      <div className="flex flex-col gap-3">
        <Badge className="flex gap-3 p-3 justify-between text-sm" variant="">
          <p className="font-extrabold text-nowrap">Today</p>
          <p className="text-nowrap">{data[0]}</p>
        </Badge>
        <Badge
          className="flex gap-3 p-3 justify-between text-sm"
          variant="secondary"
        >
          <p className="font-extrabold text-nowrap">This Week</p>
          <p className="text-nowrap">{data[1]}</p>
        </Badge>
      </div>

      <div className="flex items-end">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                {data[2]} Days left
              </h3>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>in this 12 Week Year</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default GoalsWidget;
