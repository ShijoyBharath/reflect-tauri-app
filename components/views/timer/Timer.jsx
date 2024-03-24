import React from "react";
import { Play, Pause, RotateCcw } from "lucide-react";

const Timer = () => {
  return (
    <div className="flex flex-col h-[900px] m-3 p-5 gap-3 justify-between items-center bg-slate-200 rounded-lg">
      <div className="flex flex-col items-center gap-4 p-5 m-4">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Flow Session
        </h3>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          45:00
        </h1>
        <div className="flex gap-3 justify-around items-center">
          <Play />
          <Pause />
          <RotateCcw />
        </div>
      </div>
    </div>
  );
};

export default Timer;
