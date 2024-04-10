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
import { useTimer } from "react-timer-hook";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw } from "lucide-react";
import Database from "tauri-plugin-sql-api";
import { formatDate } from "@/utils/utils";
import useTodayStore from "@/components/todayStore";
import useTimerStore from "@/components/timerStore";

const NavBar = ({ expiryTimestamp }) => {
  const [remainingTime, setRemainingTime] = useState(getRemainingTime());
  const [timer, setTimer] = useState(2700);
  const { todayGlobal } = useTodayStore();
  const { setRefreshTimer } = useTimerStore();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainingTime(getRemainingTime());
    }, 60000); // Run every minute (60000 milliseconds)

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  function getRemainingTime() {
    const now = new Date();
    const endOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      23,
      59,
      59
    ); // End of day

    const remainingMilliseconds = endOfDay - now;

    // Convert remaining milliseconds to hours and minutes
    const remainingHours = Math.floor(remainingMilliseconds / (1000 * 60 * 60));
    const remainingMinutes = Math.floor(
      (remainingMilliseconds % (1000 * 60 * 60)) / (1000 * 60)
    );

    return {
      hours: remainingHours,
      minutes: remainingMinutes,
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
  const now = todayGlobal;
  var day = now.getDate();
  var monthIndex = now.getMonth();
  var year = now.getFullYear();
  var monthName = months[monthIndex];
  if (day < 10) {
    day = "0" + day;
  }

  const {
    totalSeconds,
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp,
    autoStart: false,
    onExpire: () => {
      console.warn("Timer expired");
      insert_data(timer, formatDate(todayGlobal));
      const time = new Date();
      time.setSeconds(time.getSeconds() + timer);
      restart(time, false);
    },
  });

  const [flows, setFlows] = useState(0);
  useEffect(() => {
    get_data(formatDate(todayGlobal));
  }, []);

  async function get_data(date) {
    try {
      const db = await Database.load("sqlite:data.db");
      const select = await db.select("SELECT * FROM timer WHERE date=?", [
        date,
      ]);
      if (select.length === 0) {
        setFlows(0);
      } else {
        setFlows(select[0].flows);
      }
      const timer_data = await db.select("SELECT timer_in_sec FROM appconfig");
      setTimer(timer_data[0].timer_in_sec);
    } catch (error) {
      console.log(error);
    }
  }

  async function insert_data(timespent, date) {
    try {
      const db = await Database.load("sqlite:data.db");
      const result = await db.execute(
        "CREATE TABLE IF NOT EXISTS timer (id INTEGER PRIMARY KEY, timespent_in_sec INTEGER NOT NULL, flows INTEGER NOT NULL, date TEXT NOT NULL)"
      );
      const select = await db.select("SELECT * FROM timer WHERE date=?", [
        date,
      ]);
      if (select.length === 0) {
        const insert = await db.execute(
          "INSERT INTO timer (timespent_in_sec, flows, date) VALUES (?, ?, ?)",
          [timespent, 1, date]
        );
        setFlows(1);
        setRefreshTimer(timespent);
      } else {
        const updated_timespent = select[0].timespent_in_sec + timespent;
        const updated_flows = select[0].flows + 1;
        setFlows(updated_flows);
        setRefreshTimer(updated_flows);
        const update = await db.execute(
          "UPDATE timer SET timespent_in_sec=?, flows=? WHERE date=?",
          [updated_timespent, updated_flows, date]
        );
      }
    } catch (error) {
      console.log("error : ", error);
    }
  }

  return (
    <div className="flex justify-between gap-5 m-5">
      <div className="flex items-center gap-7 ml-5">
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
        <div className="flex items-center border-secondary border-2 rounded-3xl bg-secondary">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Badge
                  className="p-3 px-7 flex gap-2 justify-between"
                  variant=""
                >
                  <div>
                    {hours < 10 ? "0" : ""}
                    {hours}:{minutes < 10 ? "0" : ""}
                    {minutes}:{seconds < 10 ? "0" : ""}
                    {seconds}
                  </div>
                </Badge>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>{flows} Flows Today</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <div className="flex gap-3 items-center px-3">
            {isRunning ? (
              <Button
                className="hover:rounded-full"
                size={1}
                variant="ghost"
                onClick={pause}
              >
                <Pause />
              </Button>
            ) : (
              <Button
                className="hover:rounded-full"
                size={1}
                variant="ghost"
                onClick={resume}
              >
                <Play />
              </Button>
            )}
            <Button
              className="hover:rounded-full"
              size={1}
              variant="ghost"
              onClick={() => {
                const time = new Date();
                time.setSeconds(time.getSeconds() + 5);
                restart(time, false);
              }}
            >
              <RotateCcw />
            </Button>
          </div>
        </div>

        <Badge className="text-center" variant="secondary">{day + " " + monthName + " " + year}</Badge>
      </div>
    </div>
  );
};

export default NavBar;
