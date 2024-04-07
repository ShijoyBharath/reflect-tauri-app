import React from "react";
import { ThemeSwitch } from "./ThemeSwitch";

const SettingsDialog = () => {
  return (
    <div className="flex flex-col gap-6 justify-between">
      <div className="flex flex-col">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Settings
        </h4>
        <p className="text-sm">
          Change how the app feels
        </p>
      </div>
      <div>
        <ThemeSwitch/>
      </div>
    </div>
  );
};

export default SettingsDialog;
