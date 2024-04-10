import React, { useState } from "react";

import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { formatDate, getFormattedDate } from "@/utils/utils";
import { toast } from "sonner";
import Database from "tauri-plugin-sql-api";
import useDashboardStore from "@/components/dashboardStore";

const EditHabitDialog = ({ calendarId, curHabit, curDescription }) => {
  const [habit, setHabit] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const {refreshDashboard, setRefreshDashboard} = useDashboardStore();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!habit.trim() || !description.trim()) {
      setError("You have to do something!");
      return;
    }
    update_data(habit, description);
    // Clear the form fields
    setHabit("");
    setDescription("");
    setError("");
    toast("Habit updated!", {
      description: getFormattedDate(),
    });
    console.log("updated habit");
  };

  const handleDelete = () => {
    delete_data();
    toast("Habit deleted!", {
      description: getFormattedDate(),
    });
    console.log("deleted habit");
  };

  async function update_data(habit, description) {
    try {
      const db = await Database.load("sqlite:data.db");
      const update = await db.execute(
        "UPDATE habits SET habit=?, description=? WHERE uuid=?",
        [habit, description, calendarId]
      );
      setRefreshDashboard(1)
    } catch (error) {
      console.log("error : ", error);
    }
  }

  async function delete_data() {
    try {
      const db = await Database.load("sqlite:data.db");
      const deletehabit = await db.execute("DELETE FROM habits WHERE uuid=?", [
        calendarId,
      ]);
      const deletehabitsdata = await db.execute(
        "DELETE FROM habitsdata WHERE uuid=?",
        [calendarId]
      );
      setRefreshDashboard(1)
    } catch (error) {
      console.log("error : ", error);
    }
  }

  return (
    <div>
      <DialogHeader>
        <DialogTitle>Edit Habit - "{curHabit}"</DialogTitle>
        <DialogDescription>
          Doing anything is better than doing nothing.
        </DialogDescription>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 p-4 pt-8">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="habit">Habit</Label>
              <Input
                type="text"
                placeholder={curHabit}
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
                placeholder={curDescription}
                id="description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                required
              />
            </div>
            {error ? <div className="text-sm text-red-500">{error}</div> : ""}
            <div className="flex justify-between gap-5 mt-4">
              <Button className="w-full" type="submit">
                Update Habit
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button className="w-full" variant="destructive">
                    Delete Habit
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      all your progress.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={()=>{handleDelete()}}>Delete</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </form>
      </DialogHeader>
    </div>
  );
};

export default EditHabitDialog;
