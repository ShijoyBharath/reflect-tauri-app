import React from "react";
import Flows from "./Flows";
import CountdownTimer from "./CountdownTimer";
import TimeSpentToday from "./TimeSpentToday";
import TimeChart from "./TimeChart";

const Timer = () => {
  return (
    <div className="flex flex-col m-3 p-5 gap-3 justify-start items-start bg-slate-200 rounded-lg">
      <TimeSpentToday />
      <div className="flex gap-4">
        <div className="flex flex-col">
          <CountdownTimer />
          <Flows />
        </div>
        <div className="">
          <TimeChart/>
        </div>
      </div>
    </div>
  );
};

export default Timer;
