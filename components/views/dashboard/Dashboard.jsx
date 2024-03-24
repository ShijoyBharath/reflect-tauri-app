import React from "react";
import DailyQuote from "./DailyQuote";
import StatCard from "./StatCard";
import HabitsCard from "./HabitsCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
 

const Dashboard = () => {
  const habits = [
    {
      id: 1,
      calendar: "calone",
      habit: "Gym",
      description: "Do circuit training",
    },
    {
      id: 2,
      calendar: "caltwo",
      habit: "Build Reflect",
      description: "Complete capacitor.js app",
    },
    {
      id: 3,
      calendar: "calthree",
      habit: "Do SEO for projects",
      description: "Optimize",
    },
  ];

  return (
    <div className="flex flex-col h-[900px] m-3 p-5 gap-3 justify-between bg-slate-200 rounded-lg">
      <div className="flex justify-between items-center">
        <DailyQuote />
        <StatCard />
      </div>
      <ScrollArea className="whitespace-nowrap rounded-md border">
      <div className="flex gap-3 m-3">
        {habits.map((item) => {
          return (
            <HabitsCard
              key={item.id}
              habit={item.habit}
              description={item.description}
              calendarId={item.calendar}
            />
          );
        })}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
    </div>
  );
};

export default Dashboard;
