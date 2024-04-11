"use client";
import { useState, useEffect } from "react";
import Dashboard from "@/components/views/dashboard/Dashboard";
import Database from "tauri-plugin-sql-api";
import ActivateFromTrial from "@/components/views/layout/ActivateFromTrial";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import useDashboardStore from "@/components/dashboardStore";
import ThankYou from "@/components/views/layout/ThankYou";

export default function Home() {
  const [activated, setActivated] = useState(0);
  const [helper, setHelper] = useState(0);
  const { refreshDashboard, setRefreshDashboard } = useDashboardStore();

  useEffect(() => {
    check_activation();
    setHelper(localStorage.getItem("helper"));
  }, [refreshDashboard]);

  async function check_activation() {
    try {
      const db = await Database.load("sqlite:data.db");
      const activated_data = await db.select("SELECT activated from appconfig");
      setActivated(activated_data[0].activated);
    } catch (error) {
      console.log("error : ", error);
    }
  }

  return (
    <div>
      {activated === 0 ? (
        <Dialog open={true}>
          <DialogTrigger asChild></DialogTrigger>
          <DialogContent>
            <ActivateFromTrial />
          </DialogContent>
        </Dialog>
      ) : helper == 0 ? (
        <Dialog open={true}>
          <DialogTrigger asChild></DialogTrigger>
          <DialogContent>
            <ThankYou />
          </DialogContent>
        </Dialog>
      ) : (
        <Dashboard />
      )}
    </div>
  );
}
