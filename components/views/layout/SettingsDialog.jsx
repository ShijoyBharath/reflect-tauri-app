"use client";
import React, { useEffect, useState } from "react";
import { ThemeSwitch } from "./ThemeSwitch";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Timer } from "lucide-react";
import Database from "tauri-plugin-sql-api";

const SettingsDialog = () => {
  const [value, setValue] = useState(2700);
  const timerValues = [
    {
      name: "45Mins",
      time: 2700,
    },
    {
      name: "1Hr",
      time: 3600,
    },
    {
      name: "1Hr 30Mins",
      time: 5400,
    },
    {
      name: "2Hr",
      time: 7200,
    },
  ];

  useEffect(() => {
    get_data();
  }, []);

  async function get_data(date) {
    try {
      const db = await Database.load("sqlite:data.db");
      const select = await db.select("SELECT * FROM appconfig");
      if (select[0].timer_in_sec) {
        setValue(select[0].timer_in_sec);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function insert_data(timer_in_sec) {
    try {
      const db = await Database.load("sqlite:data.db");
      const result = await db.execute(
        "UPDATE appconfig SET timer_in_sec=? WHERE id=1",
        [timer_in_sec]
      );
    } catch (error) {
      console.log("error : ", error);
    }
  }

  return (
    <div className="flex flex-col gap-6 justify-between">
      <div className="flex flex-col">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Settings
        </h4>
        <p className="text-sm">Change app preferences.</p>
      </div>
      <div className="flex gap-3 justify-evenly">
        <div className="flex flex-col gap-2">
          <p className="text-sm">Theme</p>
          <ThemeSwitch />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-sm">Timer</p>
          <Select
            value={value}
            onValueChange={(val) => {
              setValue(parseInt(val));
              insert_data(val);
            }}
          >
            <SelectTrigger className="w-[180px] flex justify-around">
              <Timer />
              <SelectValue placeholder="Timer Settings" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel className="font-bold">Timer Settings</SelectLabel>
                {timerValues.map((item) => {
                  return (
                    <SelectItem key={item.name} value={item.time}>
                      {item.name}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default SettingsDialog;
