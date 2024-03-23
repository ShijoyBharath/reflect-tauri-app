import React from "react";
import Dashboard from "./Dashboard";
import { Toaster } from "@/components/ui/sonner";

const MainPage = () => {
  return (
    <div>
      <Dashboard />
      <Toaster />
    </div>
  );
};

export default MainPage;
