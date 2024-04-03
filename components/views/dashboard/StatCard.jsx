import React from "react";
import TimeChartDashboard from "./TimeChartDashboard";

const StatCard = () => {
  return (
    <div className="flex justify-center items-center gap-4 m-4 p-9 rounded-lg bg-white h-[400px] grow">
      <TimeChartDashboard />
      <div className="flex flex-col gap-3">
        <h1 className="scroll-m-20 text-5xl font-extrabold tracking-tight lg:text-7xl">
          88%
        </h1>
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Overall Score
        </h4>
      </div>
    </div>
  );
};

export default StatCard;
