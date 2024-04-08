"use client";
import React, { useEffect, useState } from "react";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { v4 as uuidv4 } from "uuid";
import Database from "tauri-plugin-sql-api";
import { formatDate, getFormattedDate } from "@/utils/utils";
import { toast } from "sonner";
import useTodayStore from "@/components/todayStore";

const CreateHabitDialog = () => {
  const [habit, setHabit] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const {todayGlobal} = useTodayStore()

  useEffect(() => {
    init_table();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!habit.trim() || !description.trim()) {
      setError("You have to do something!");
      return;
    }
    const uuid = uuidv4();
    const today = formatDate(todayGlobal);
    insert_data(uuid, habit, description, today);
    // Clear the form fields
    setHabit("");
    setDescription("");
    setError("");
    toast("You created a new habit!", {
      description: getFormattedDate(),
    });
    console.log("saved habit");
  };

  async function init_table() {
    try {
      const db = await Database.load("sqlite:data.db");
      const result = await db.execute(
        "CREATE TABLE IF NOT EXISTS habits (id INTEGER PRIMARY KEY, uuid TEXT NOT NULL, habit TEXT NOT NULL, description TEXT NOT NULL, created_at TEXT NOT NULL)"
      );
    } catch (error) {
      console.log("error : ", error);
    }
  }

  async function insert_data(uuid, habit, description, created_at) {
    try {
      const db = await Database.load("sqlite:data.db");
      const select = await db.select("SELECT * FROM habits WHERE uuid=?", [
        uuid,
      ]);
      if (select.length === 0) {
        const insert = await db.execute(
          "INSERT INTO habits (uuid, habit, description, created_at) VALUES (?, ?, ?, ?)",
          [uuid, habit, description, created_at]
        );
      } else {
        const update = await db.execute(
          "UPDATE habits SET habit=?, description=? WHERE uuid=?",
          [habit, description, uuid]
        );
      }
    } catch (error) {
      console.log("error : ", error);
    }
  }

  return (
    <div>
      <DialogHeader>
        <DialogTitle>Let's create a new habit</DialogTitle>
        <DialogDescription>So, what do you plan to do?</DialogDescription>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 p-4 pt-8">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="habit">Habit</Label>
              <Input
                type="text"
                placeholder="Let's get to it!"
                id="habit"
                value={habit}
                onChange={(event) => setHabit(event.target.value)}
                required
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="description">Description</Label>
              <Input
                type="text"
                placeholder="What do you plan to accomplish?!"
                id="description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                required
              />
            </div>
            {error ? <div className="text-sm text-red-500">{error}</div> : ""}
            <div className="mt-4">
              <Button className="w-full" type="submit">
                Create Habit
              </Button>
            </div>
          </div>
        </form>
      </DialogHeader>
    </div>
  );
};

export default CreateHabitDialog;
