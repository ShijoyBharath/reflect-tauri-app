import React, { useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";
import { PartyPopper } from "lucide-react";
import Database from "tauri-plugin-sql-api";
import { formatDate, getFormattedDate } from "@/utils/utils";

const MarkAsCompleteDialog = ({ calendarId }) => {
  const [value, setValue] = useState(10);

  useEffect(() => {
    init_table();
  }, []);

  async function init_table() {
    try {
      const db = await Database.load("sqlite:data.db");
      const result = await db.execute(
        "CREATE TABLE IF NOT EXISTS habitsdata (id INTEGER PRIMARY KEY, uuid TEXT NOT NULL, value INTEGER NOT NULL, date TEXT NOT NULL)"
      );
    } catch (error) {
      console.log("error : ", error);
    }
  }

  async function insert_data(calendarId, value, date) {
    try {
      const db = await Database.load("sqlite:data.db");
      const select = await db.select(
        "SELECT * FROM habitsdata WHERE uuid=? AND date=?",
        [[calendarId, date]]
      );
      if (select.length === 0) {
        const insert = await db.execute(
          "INSERT INTO habitsdata (uuid, value, date) VALUES (?, ?, ?)",
          [calendarId, value, date]
        );
      } else {
        const update = await db.execute(
          "UPDATE habitsdata SET value=? WHERE uuid=? AND date=?",
          [value, calendarId, date]
        );
      }
    } catch (error) {
      console.log("error : ", error);
    }
  }

  return (
    <div>
      <DialogHeader>
        <DialogTitle>Rate your day</DialogTitle>
        <DialogDescription>Be brutally honest with yourself.</DialogDescription>
      </DialogHeader>
      <div className="flex gap-5 items-end">
        <h1 className="pt-5 scroll-m-20 text-6xl font-extrabold tracking-tight lg:text-5xl">
          {value}/10
        </h1>
        <p className="text-md text-muted-foreground">
          <PartyPopper />
          Perfect!
        </p>
      </div>
      <div className="p-7 m-5">
        <Slider
          defaultValue={[10]}
          max={10}
          step={1}
          onValueChange={(val) => setValue(val[0])}
        />
      </div>
      <DialogFooter>
        <Button
          type="submit"
          onClick={() => [
            toast("Saved your progress!", {
              description: getFormattedDate(),
              // action: {
              //   label: "Undo",
              //   onClick: () => console.log("undo"),
              // },
            }),
            insert_data(calendarId, value, formatDate(new Date())),
          ]}
        >
          Save Progress
        </Button>
      </DialogFooter>
    </div>
  );
};

export default MarkAsCompleteDialog;
