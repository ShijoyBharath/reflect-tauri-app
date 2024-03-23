import React from "react";
import DailyQuote from "./DailyQuote";
import StatCard from "./StatCard";
import HabitsCard from "./HabitsCard";

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
    <div className="flex flex-col gap-3 justify-between">
      <div className="flex gap-4 items-center justify-between">
        <DailyQuote />
        <StatCard />
      </div>
      <div className="flex flex-wrap gap-3 m-3">
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
    </div>
  );
};

export default Dashboard;
