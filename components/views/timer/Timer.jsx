import React from "react";
import Flows from "./Flows";
import CountdownTimer from "./CountdownTimer";
import TimeSpentToday from "./TimeSpentToday";
import TimeChart from "./TimeChart";
import FlowChart from "./FlowChart";
import Database from "tauri-plugin-sql-api";

const Timer = () => {

  async function init_table() {
    try {
      const db = await Database.load("sqlite:data.db");
      const result = await db.execute(
        "CREATE TABLE IF NOT EXISTS timer (id INTEGER PRIMARY KEY, timespent TEXT NOT NULL, flows INTEGER NOT NULL, date TEXT NOT NULL)"
      );
    } catch (error) {
      console.log("error : ", error);
    }
  }

  return (
    <div className="flex flex-col m-3 p-5 gap-3 justify-start items-start bg-slate-200 rounded-lg">
      <TimeSpentToday />
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
