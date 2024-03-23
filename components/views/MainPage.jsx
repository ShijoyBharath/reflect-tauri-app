import React from "react";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import Dashboard from "./Dashboard";
import { Toaster } from "@/components/ui/sonner"

const MainPage = () => {
  return (
    <div>
      <NavBar />
      <div className="flex gap-3">
        <SideBar />
        <Dashboard />
      </div>
    <Toaster/>
    </div>
  );
};

export default MainPage;
