import React from "react";

const GoalsWidget = () => {
  return (
    <div className="flex flex-col m-4 p-5 bg-white rounded-lg">
      <div className="flex gap-4 justify-between">
        <p className="font-medium">Today</p>
        <p>Integrate SQLite</p>
      </div>
      <div className="flex gap-4 justify-between">
        <p className="font-medium">This week</p>
        <p>Complete Tauri app</p>
      </div>
    </div>
  );
};

export default GoalsWidget;
