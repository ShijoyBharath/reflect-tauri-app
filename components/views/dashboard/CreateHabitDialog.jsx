import React from "react";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const CreateHabitDialog = () => {
  return (
    <div>
      <DialogHeader>
        <DialogTitle>Let's create a new habit</DialogTitle>
        <DialogDescription>So, what do you plan to do?</DialogDescription>
        <div className="flex flex-col gap-4 p-4 pt-8">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="habit">Habit</Label>
            <Input type="text" id="habit" placeholder="Your Habit name" />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="description">Description</Label>
            <Input type="text" id="description" placeholder="What will you do" />
          </div>
        </div>
      </DialogHeader>
    </div>
  );
};

export default CreateHabitDialog;
