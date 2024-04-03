import React from "react";
import Flows from "./Flows";
import CountdownTimer from "./CountdownTimer";
import TimeSpentToday from "./TimeSpentToday";
import TimeChart from "./TimeChart";
import FlowChart from "./FlowChart";

const Timer = () => {
  return (
    <div className="flex flex-col m-3 p-5 gap-3 justify-start items-start bg-slate-200 rounded-lg">
      <TimeSpentToday />
      <div className="flex gap-4">
        <div className="flex flex-col">
          <CountdownTimer />
          <Flows />
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
