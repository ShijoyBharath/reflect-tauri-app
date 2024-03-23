import React from "react";
import { Circle } from "lucide-react";

const NavBar = () => {
  return (
    <div className="flex justify-between m-5">
      <div className="flex items-center gap-3">
        <Circle />
        <h3 className="text-2xl font-semibold tracking-tight">Reflect</h3>
      </div>
      <div className="flex gap-3">
        <p className="text-xl text-muted-foreground">23 March 2024</p>
      </div>
    </div>
  );
};

export default NavBar;
