"use client";
import React, { useState, useRef } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

function CountdownTimer() {
  const TIMERVALUE = 2700;

  const [time, setTime] = useState(TIMERVALUE); // Initial countdown time in seconds
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const startTimer = () => {
    if (!isRunning && time > 0) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    }
  };

  const stopTimer = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setTime(TIMERVALUE); // Reset to initial countdown time
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  async function init_table() {
    try {
      const db = await Database.load("sqlite:data.db");
      const result = await db.execute(
        "CREATE TABLE IF NOT EXISTS timer (id INTEGER PRIMARY KEY, timespent TEXT NOT NULL, flows INTEGER NOT NULL, date TEXT NOT NULL)"
      );
      const start_date = await db.select("SELECT * FROM appconfig");

      // start_date[0].start_date;
    } catch (error) {
      console.log("error : ", error);
    }
  }

  async function insert_data(timespent, flows, date) {
    try {
      const db = await Database.load("sqlite:data.db");
      const select = await db.select("SELECT * FROM timer WHERE date=?", [
        date,
      ]);
      if (select.length === 0) {
        const insert = await db.execute(
          "INSERT INTO timer (timespent, flows, date) VALUES (?, ?, ?)",
          [timespent, flows, date]
        );
      } else {
        const update = await db.execute(
          "UPDATE timer SET timespent=?, flows=? WHERE date=?",
          [timespent, flows, date]
        );
      }
    } catch (error) {
      console.log("error : ", error);
    }
  }

  async function get_data(start_date, end_date) {
    try {
      const db = await Database.load("sqlite:data.db");
      const select = await db.select(
        "SELECT * FROM timer WHERE DATE(date) BETWEEN DATE(?) AND DATE(?)",
        [start_date, end_date]
      );
      return select;
    } catch (error) {
      console.log("error : ", error);
    }
  }

  return (
    <div className="flex flex-col justify-start gap-4 p-10 m-4 bg-white rounded-lg w-[300px]">
      <h3 className="pl-4 scroll-m-20 text-2xl font-semibold tracking-tight">
        Flow
      </h3>
      <h1 className="pl-4 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        {formatTime(time)}
      </h1>
      <div className="flex gap-3 justify-start items-center">
        {isRunning || time <= 0 ? (
          <Button variant="ghost" onClick={stopTimer} disabled={!isRunning}>
            <Pause />
          </Button>
        ) : (
          <Button
            variant="ghost"
            onClick={startTimer}
            disabled={isRunning || time <= 0}
          >
            <Play />
          </Button>
        )}

        <Button variant="ghost" onClick={resetTimer}>
          <RotateCcw />
        </Button>
      </div>
    </div>
  );
}

export default CountdownTimer;
