"use client";
import React, { useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { Checkbox } from "@/components/ui/checkbox";

const Weekly = (props) => {
  const [state, setState] = useState([
    { id: 1, name: "Week 1" },
    { id: 2, name: "Week 2" },
    { id: 3, name: "Week 3" },
    { id: 4, name: "Week 4" },
    { id: 5, name: "Week 5" },
    { id: 6, name: "Week 6" },
    { id: 7, name: "Week 7" },
    { id: 8, name: "Week 8" },
    { id: 9, name: "Week 19" },
    { id: 10, name: "Week 10" },
    { id: 11, name: "Week 11" },
    { id: 12, name: "Week 12" },
  ]);

  return (
    <div className="flex flex-col justify-start rounded-lg p-5 bg-slate-100 w-[500px]">
      <div className="m-3 p-3">
        Weekly Goals
      </div>
      <ReactSortable
        list={state}
        setList={setState}
        animation={200}
        delayOnTouchStart={true}
        delay={2}
      >
        {state.map((item) => (
          <div
            className="flex gap-4 items-center space-x-2 m-3 p-3 bg-white rounded-lg"
            key={item.id}
          >
            <Checkbox id={item.id} />
            <label
              htmlFor={item.id}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {item.name}
            </label>
          </div>
        ))}
      </ReactSortable>
    </div>
  );
};

export default Weekly;
