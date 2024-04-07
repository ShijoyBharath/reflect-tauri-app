import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ThemeSwitch } from "./ThemeSwitch";

const SettingsDialog = () => {
  return (
    <div className="flex flex-col py-4">
      <h2>Settings</h2>
      <div className="flex flex-col justitfy-around gap-4">
        <div className="flex justify-between gap-4 p-3">
          <h3>Dark Mode</h3>
          <ThemeSwitch/>
        </div>
        <div className="flex justify-between gap-4 p-3">
          <h3>Dark Mode</h3>
          <Switch />
        </div>
        <div className="flex justify-between gap-4 p-3">
          <h3>Dark Mode</h3>
          <Switch />
        </div>
        <div className="flex justify-between gap-4 p-3">
          <h3>Dark Mode</h3>
          <Switch />
        </div>
        <div className="flex justify-between gap-4 p-3">
          <h3>Dark Mode</h3>
          <Switch />
        </div>
      </div>
    </div>
  );
};

export default SettingsDialog;
