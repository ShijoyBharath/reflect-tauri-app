import React from "react";

function TimeSpentToday({ time }) {
  function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    return `${hours}Hr ${minutes}Min`;
  }

  return (
    <div className="flex flex-col gap-4 p-7 py-10 bg-white rounded-lg w-full">
      <h1 className="scroll-m-20 text-9xl font-extrabold tracking-tight lg:text-9xl">
        {formatTime(time)}
      </h1>
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Time Spent Today
      </h3>
    </div>
  );
}

export default TimeSpentToday;
