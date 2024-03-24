import React from "react";
import Dashboard from "@/components/views/dashboard/Dashboard";
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
