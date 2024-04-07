"use client";
import React, { useEffect, useState } from "react";
import TimeSpentToday from "./TimeSpentToday";
import TimeChart from "./TimeChart";
import FlowChart from "./FlowChart";
import Database from "tauri-plugin-sql-api";
import { formatDate } from "@/utils/utils";

const Timer = () => {
  useEffect(() => {
    init_table(formatDate(new Date()));
  }, []);

  const [timespenttoday, setTimespenttoday] = useState(0);

  async function init_table(date) {
    try {
      const db = await Database.load("sqlite:data.db");
      const result = await db.execute(
        "CREATE TABLE IF NOT EXISTS timer (id INTEGER PRIMARY KEY, timespent_in_sec INTEGER NOT NULL, flows INTEGER NOT NULL, date TEXT NOT NULL)"
      );
      const select = await db.select("SELECT * FROM timer WHERE date=?", [
        date,
      ]);
      if (select.length === 0) {
        setTimespenttoday(0);
      } else {
        setTimespenttoday(select[0].timespent_in_sec);
      }
    } catch (error) {
      console.log("error : ", error);
    }
  }

  return (
    <div className="flex flex-col gap-3 mr-3 justify-between bg-slate-200 rounded-lg">
      <div className="flex flex-col gap-3">
      <TimeSpentToday time={timespenttoday} />
      <div className="flex flex-wrap gap-4 m-4">
        <div className="bg-white rounded-lg p-5">
          <TimeChart />
        </div>
        <div className="bg-white rounded-lg p-5">
          <FlowChart />
        </div>
      </div>
      </div>
      
    </div>
  );
};

export default Timer;
