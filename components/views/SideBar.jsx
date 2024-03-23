import React from "react";
import { Settings, LineChart, Timer, CalendarDays, Plus, Lightbulb } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogTrigger, DialogContent } from "../ui/dialog";
import CreateHabitDialog from "./CreateHabitDialog";

const SideBar = () => {
  return (
    <div className="flex flex-col justify-between items-center m-5 h-[900px] w-[30px]">
      <div className="flex flex-col gap-6">
        <Button variant="ghost">
          <LineChart />
        </Button>
        <Button variant="ghost">
          <Timer />
        </Button>
        <Button variant="ghost">
          <CalendarDays />
        </Button>
        <Button variant="ghost">
        <Lightbulb />
        </Button>
      </div>
      <div className="flex flex-col items-center gap-6">
        <Dialog asChild>
          <DialogTrigger asChild>
            <Button variant="ghost">
              <Plus />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <CreateHabitDialog />
          </DialogContent>
        </Dialog>

        <Button variant="ghost">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Button>
        <Button variant="ghost">
          <Settings />
        </Button>
      </div>
    </div>
  );
};

export default SideBar;
