import React from "react";

function TimeSpentToday() {

  return (
    <div className="flex flex-col gap-4 p-10 m-4 bg-white rounded-lg w-[300px]">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Time Spent Today
      </h3>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        3Hr 42Min
      </h1>
    </div>
  );
}

export default TimeSpentToday;
