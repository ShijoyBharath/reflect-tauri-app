"use client";
import React, { useState, useEffect } from "react";
import DailyQuote from "./DailyQuote";
import HabitsCard from "./HabitsCard";
import GoalsWidget from "./GoalsWidget";
import Database from "tauri-plugin-sql-api";
import TimeChartDashboard from "./TimeChartDashboard";
import useDashboardStore from "@/components/dashboardStore";

const Dashboard = () => {
  const [habits, setHabits] = useState([]);
  const { refreshDashboard } = useDashboardStore();

  useEffect(() => {
    get_data();
  }, [refreshDashboard]);

  async function get_data() {
    try {
      const db = await Database.load("sqlite:data.db");
      const select = await db.select("SELECT * FROM habits");
      setHabits(select);
    } catch (error) {
      console.log("error : ", error);
    }
  }

  return (
    <div className="flex flex-col gap-3 mr-3 justify-between bg-secondary rounded-lg">
      <div className="flex flex-col lg:flex-row lg:items-center gap-3">
        <div className="flex flex-col lg:w-3/5">
          <DailyQuote />
          <GoalsWidget />
        </div>
        <div className="grow">
          <TimeChartDashboard />
        </div>
      </div>
      {/* <ScrollArea className="whitespace-nowrap rounded-md border"> */}
      <div className="flex flex-wrap justify-around gap-3 m-3">
        {habits.length !== 0 ? (
          habits.map((item) => {
            return (
              <HabitsCard
                key={item.id}
                habit={item.habit}
                description={item.description}
                calendarId={item.uuid}
              />
            );
          })
        ) : (
          <p className="text-base text-muted-foreground py-5">
            Create habits by clicking the "+" icon on the sidebar!
          </p>
        )}
      </div>
      {/* <ScrollBar orientation="horizontal" />
    </ScrollArea> */}
    </div>
  );
};

export default Dashboard;
