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
import Database from "tauri-plugin-sql-api";
import { formatDate, getFormattedDate } from "@/utils/utils";
import { toast } from "sonner";
import { LockOpen } from "lucide-react";
import useDashboardStore from "@/components/dashboardStore";

const ActivateFromTrial = () => {
  const [email, setEmail] = useState("");
  const [secret, setSecret] = useState("");
  const [error, setError] = useState("");
  const {refreshDashboard, setRefreshDashboard} = useDashboardStore();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email.trim() || !secret.trim()) {
      setError("You'll need both to unlock!");
      return;
    }
    // const uuid = uuidv4();
    // const today = formatDate(todayGlobal);
    activate_reflect(email, secret);
    // Clear the form fields
    setEmail("");
    setSecret("");
    setError("");
    toast("Congrats! You have complete access, forever!", {
      description: getFormattedDate(),
    });
    console.log("unlocked");
  };

  async function activate_reflect(email, secret) {
    try {
      const db = await Database.load("sqlite:data.db");

      //function to call server to check if data matches.

      const update = await db.execute(
        "UPDATE appconfig SET activated=1 WHERE id=1"
      );
      setRefreshDashboard(1);
    } catch (error) {
      console.log("error : ", error);
    }
  }

  return (
    <div>
      <DialogHeader>
        <DialogTitle>Unfortunately, your trial period has ended</DialogTitle>
        <DialogDescription>If you would like to continue using reflect, Please consider purchasing. Thank you!</DialogDescription>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 p-4 pt-8">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                placeholder="Enter your email"
                id="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="description">Secret Key</Label>
              <Input
                type="text"
                placeholder="Enter your super secret key"
                id="secret"
                value={secret}
                onChange={(event) => setSecret(event.target.value)}
                required
              />
            </div>
            {error ? <div className="text-sm text-red-500">{error}</div> : ""}
            <div className="mt-4">
              <Button className="flex gap-2 w-full" type="submit">
                <LockOpen />
                Unlock Forever
              </Button>
            </div>
          </div>
        </form>
      </DialogHeader>
    </div>
  );
};

export default ActivateFromTrial;
