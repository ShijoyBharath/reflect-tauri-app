"use client"
import React, { useState, useEffect } from "react";
import DailyQuote from "./DailyQuote";
import StatCard from "./StatCard";
import HabitsCard from "./HabitsCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import GoalsWidget from "./GoalsWidget";
import Database from "tauri-plugin-sql-api";

const Dashboard = () => {

  const [habits, setHabits] = useState([])

  useEffect(()=>{
    get_data().then((data)=> setHabits(data))
  }, [])

  async function get_data(start_date, end_date) {
    try {
      const db = await Database.load("sqlite:data.db");
      const select = await db.select(
        "SELECT * FROM habits",
      );
      return select;
    } catch (error) {
      console.log("error : ", error);
    }
  }

  return (
    <div className="flex flex-col m-3 p-5 gap-3 justify-between bg-slate-200 rounded-lg">
      <div className="flex items-center">
        <div className="flex flex-col">
          <DailyQuote />
          <GoalsWidget />
        </div>
        <div className="grow">
          <StatCard />
        </div>
      </div>
      {/* <ScrollArea className="whitespace-nowrap rounded-md border"> */}
      <div className="flex flex-wrap gap-3 m-3">
        {habits.map((item) => {
          return (
            <HabitsCard
              key={item.id}
              habit={item.habit}
              description={item.description}
              calendarId={"calendar-" + item.uuid}
            />
          );
        })}
      </div>
      {/* <ScrollBar orientation="horizontal" />
    </ScrollArea> */}
    </div>
  );
};

export default Dashboard;
