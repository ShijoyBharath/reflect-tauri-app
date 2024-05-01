"use client";
import React, { useState, useEffect } from "react";
import DailyQuote from "./DailyQuote";
import HabitsCard from "./HabitsCard";
import GoalsWidget from "./GoalsWidget";
import Database from "tauri-plugin-sql-api";
import TimeChartDashboard from "./TimeChartDashboard";
import useDashboardStore from "@/components/dashboardStore";

import {
  useQuery,
} from '@tanstack/react-query'


const Dashboard = () => {
  // const { refreshDashboard } = useDashboardStore();

  async function get_data() {
    try {
      const db = await Database.load("sqlite:data.db");
      const select = await db.select("SELECT * FROM habits");
      return select
    } catch (error) {
      console.log("error : ", error);
    }
  }

  const { isPending, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: get_data,
  })

  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  return (
    <div className="flex flex-col gap-3 mr-3 mb-3 justify-between bg-secondary rounded-lg">
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
        {data.length !== 0 ? (
          data.map((item) => {
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
