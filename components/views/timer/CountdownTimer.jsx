"use client";
import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import Database from "tauri-plugin-sql-api";

function CountdownTimer({ expiryTimestamp }) {


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

  return (
    <div className="flex flex-col justify-start gap-4 p-10 m-4 bg-white rounded-lg w-[300px]">
      <h3 className="pl-4 scroll-m-20 text-2xl font-semibold tracking-tight">
        Flow
      </h3>
      <h1 className="pl-4 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        {hours < 10 ? "0" : ""}
        {hours}:{minutes < 10 ? "0" : ""}
        {minutes}:{seconds < 10 ? "0" : ""}
        {seconds}
      </h1>
      <div className="flex gap-3 justify-start items-center">
        {isRunning ? (
          <Button variant="ghost" onClick={pause}>
            <Pause />
          </Button>
        ) : (
          <Button variant="ghost" onClick={resume}>
            <Play />
          </Button>
        )}

        <Button
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
  );
}

export default CountdownTimer;
