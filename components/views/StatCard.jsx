import React from "react";

const StatCard = () => {
  return (
    <div className="flex flex-col justify-between items-center m-4">
      <div className="flex flex-col items-start">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          88%
        </h1>
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Overall Score
        </h4>
      </div>
      <div className="flex items-end gap-2">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          39
        </h3>
        <p className="leading-7 [&:not(:first-child)]:mt-6">Days Left</p>
      </div>
    </div>
  );
};

export default StatCard;
