"use client";
import React, { useEffect, useState } from "react";
import { Circle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const NavBar = () => {
  const [remainingTime, setRemainingTime] = useState(getRemainingTime());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setRemainingTime(getRemainingTime());
        }, 60000); // Run every minute (60000 milliseconds)

        // Clean up the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []);

    function getRemainingTime() {
        const now = new Date();
        const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59); // End of day

        const remainingMilliseconds = endOfDay - now;

        // Convert remaining milliseconds to hours and minutes
        const remainingHours = Math.floor(remainingMilliseconds / (1000 * 60 * 60));
        const remainingMinutes = Math.floor((remainingMilliseconds % (1000 * 60 * 60)) / (1000 * 60));

        return {
            hours: remainingHours,
            minutes: remainingMinutes
        };
    }


  var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const now = new Date();
  var day = now.getDate();
  var monthIndex = now.getMonth();
  var year = now.getFullYear();
  var monthName = months[monthIndex];
  if (day < 10) {
    day = "0" + day;
  }

  return (
    <div className="flex justify-between m-7">
      <div className="flex items-center gap-3">
        <Circle />
        <h3 className="text-2xl font-semibold tracking-tight">Reflect</h3>
      </div>
      <div className="flex gap-3">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Badge className="p-3" variant="">
                {remainingTime.hours}Hr {remainingTime.minutes}Min
              </Badge>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Time left today</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Badge variant="secondary">{day + " " + monthName + " " + year}</Badge>
      </div>
    </div>
  );
};

export default NavBar;
