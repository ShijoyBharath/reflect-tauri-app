"use client";
import React, { useState, useEffect } from "react";
import Database from "tauri-plugin-sql-api";
import { formatDate, getCurrent12Weeks } from "@/utils/utils";

const GoalsWidget = () => {
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
      const today = formatDate(new Date());
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
      var current12week = getCurrent12Weeks(start_date[0].start_date);
      var daysleft = calculateDaysLeft(today, current12week[1]);

      return [select_daily[0].goal, select_weekly[0].goal, daysleft];
    } catch (error) {
      console.log("error : ", error);
    }
  }
  useEffect(() => {
    get_data().then((data) => setData(data));
  }, []);

  return (
    <div className="flex flex-col gap-4 m-4 p-9 justify-between bg-white rounded-lg">
      <div>
        <div className="flex gap-4 justify-between">
          <p className="font-medium">Today</p>
          <p>{data[0]}</p>
        </div>
        <div className="flex gap-4 justify-between">
          <p className="font-medium">This week</p>
          <p>{data[1]}</p>
        </div>
      </div>

      <div className="flex items-end">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          {data[2]} Days left
        </h3>
      </div>
    </div>
  );
};

export default GoalsWidget;
