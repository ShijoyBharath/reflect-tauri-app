"use client";
import React, { useEffect, useState } from "react";
import {
  Settings,
  LineChart,
  Timer,
  CalendarDays,
  Plus,
  Lightbulb,
  ListTodo,
  LockKeyhole,
} from "lucide-react";
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
import Activate from "./Activate";
import Database from "tauri-plugin-sql-api";
import useDashboardStore from "@/components/dashboardStore";

const SideBar = () => {
  const pathname = usePathname();
  const [activated, setActivated] = useState(0);
  const {refreshDashboard, setRefreshDashboard} = useDashboardStore();

  // useEffect(() => {
  //   check_activation();
  // }, [refreshDashboard]);

  // async function check_activation() {
  //   try {
  //     const db = await Database.load("sqlite:data.db");
  //     const activated_data = await db.select("SELECT activated from appconfig");
  //     setActivated(activated_data[0].activated);
  //   } catch (error) {
  //     console.log("error : ", error);
  //   }
  // }

  return (
    <div className="flex flex-col gap-10 justify-between items-center m-5">
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
        {pathname === "/" ? (
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
        ) : (
          ""
        )}

        {/* {activated === 0 ? (
          <Dialog>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DialogTrigger asChild>
                    <Button variant="ghost">
                      <LockKeyhole />
                    </Button>
                  </DialogTrigger>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Purchase to unlock forever!</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <DialogContent>
              <Activate />
            </DialogContent>
          </Dialog>
        ) : (
          ""
        )} */}

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
