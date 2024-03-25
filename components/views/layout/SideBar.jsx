"use client";
import React from "react";
import {
  Settings,
  LineChart,
  Timer,
  CalendarDays,
  Plus,
  Lightbulb,
  ListTodo
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import CreateHabitDialog from "@/components/views/dashboard/CreateHabitDialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SettingsDialog from "./SettingsDialog";

const SideBar = () => {
  const pathname = usePathname();
  return (
    <div className="flex flex-col gap-8 justify-between items-center m-5">
      <div className="flex flex-col gap-6">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="/">
                <Button variant={pathname === "/" ? "" : "ghost"}>
                  <LineChart />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Dashboard</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="/timer">
                <Button variant={pathname === "/timer" ? "" : "ghost"}>
                  <Timer />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Timer</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="/calendar">
                <Button variant={pathname === "/calendar" ? "" : "ghost"}>
                  <CalendarDays />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Calendar</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="/suggested">
                <Button variant={pathname === "/suggested" ? "" : "ghost"}>
                  <Lightbulb />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Suggested</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="/goals">
                <Button variant={pathname === "/goals" ? "" : "ghost"}>
                  <ListTodo />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Goals</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="flex flex-col items-center gap-6">
        {
          pathname === "/" ?
          <Dialog>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <DialogTrigger asChild>
                  <Button variant="ghost">
                    <Plus />
                  </Button>
                </DialogTrigger>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Add Habit</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <DialogContent>
            <CreateHabitDialog />
          </DialogContent>
        </Dialog>
          :
          ""
        }

        <Button variant="ghost">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Button>
        <Dialog>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <DialogTrigger asChild>
                  <Button variant="ghost">
                    <Settings />
                  </Button>
                </DialogTrigger>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Settings</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <DialogContent>
            <SettingsDialog />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default SideBar;
