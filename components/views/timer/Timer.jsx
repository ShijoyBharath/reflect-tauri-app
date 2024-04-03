import React from "react";
import Flows from "./Flows";
import CountdownTimer from "./CountdownTimer";
import TimeSpentToday from "./TimeSpentToday";

const Timer = () => {
  return (
    <div className="flex m-3 p-5 gap-3 justify-between items-center bg-slate-200 rounded-lg">
      <CountdownTimer/>
      <Flows />
      <TimeSpentToday/>
    </div>
  );
};

export default Timer;
