import React from "react";

const GoalsWidget = () => {
  function getDaysLeft(futureDate) {
    // Get the current date
    const currentDate = new Date();

    // Convert futureDate to milliseconds
    const futureDateMS = futureDate.getTime();

    // Convert currentDate to milliseconds
    const currentDateMS = currentDate.getTime();

    // Calculate the difference in milliseconds
    const differenceMS = futureDateMS - currentDateMS;

    // Convert milliseconds to days
    const differenceDays = Math.ceil(differenceMS / (1000 * 60 * 60 * 24));

    return differenceDays;
  }
  
  const futureDate = new Date("2024-05-01"); // Set the future date
  const daysLeft = getDaysLeft(futureDate);


  return (
    <div className="flex flex-col gap-4 m-4 p-9 justify-between bg-white rounded-lg">
      <div>
        <div className="flex gap-4 justify-between">
          <p className="font-medium">Today</p>
          <p>Integrate SQLite</p>
        </div>
        <div className="flex gap-4 justify-between">
          <p className="font-medium">This week</p>
          <p>Complete Tauri app</p>
        </div>
      </div>

      <div className="flex items-end">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          {daysLeft} Days left
        </h3>
      </div>
    </div>
  );
};

export default GoalsWidget;
