"use client"
import React, { useEffect, useState } from "react";
import Flows from "./Flows";
import CountdownTimer from "./CountdownTimer";
import TimeSpentToday from "./TimeSpentToday";
import TimeChart from "./TimeChart";
import FlowChart from "./FlowChart";
import Database from "tauri-plugin-sql-api";

const Timer = () => {

  useEffect(()=>{
    init_table(formatDate(new Date()))
  },[])

  const [timespenttoday, setTimespenttoday] = useState(0)

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  async function init_table(date) {
    try {
      const db = await Database.load("sqlite:data.db");
      const result = await db.execute(
        "CREATE TABLE IF NOT EXISTS timer (id INTEGER PRIMARY KEY, timespent_in_sec INTEGER NOT NULL, flows INTEGER NOT NULL, date TEXT NOT NULL)"
      );
      const select = await db.select("SELECT * FROM timer WHERE date=?", [
        date,
      ]);
      setTimespenttoday(select[0].timespent_in_sec)
    } catch (error) {
      console.log("error : ", error);
    }
  }

  return (
    <div className="flex flex-col m-3 p-5 gap-3 justify-start items-start bg-slate-200 rounded-lg">
      <TimeSpentToday time={timespenttoday}/>
      <div className="flex gap-4">
        <div className="flex flex-col">
          {/* <CountdownTimer expiryTimestamp={time}/> */}
          {/* <Flows /> */}
        </div>
        <div className="flex gap-4">
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
