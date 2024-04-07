import React from "react";
import { formatTime } from "@/utils/utils";

function TimeSpentToday({ time }) {
  return (
    <div className="flex flex-col gap-4 m-4 p-10 bg-white rounded-lg">
      <h1 className="scroll-m-20 text-5xl font-extrabold tracking-tight md:text-7xl lg:text-8xl">
        {formatTime(time)}
      </h1>
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Time Spent Today
      </h3>
    </div>
  );
}

export default TimeSpentToday;
