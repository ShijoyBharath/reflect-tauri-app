import React from "react";
import { Circle } from "lucide-react";
import { Badge } from "@/components/ui/badge"

const NavBar = () => {
  return (
    <div className="flex justify-between m-5">
      <div className="flex items-center gap-3">
        <Circle />
        <h3 className="text-2xl font-semibold tracking-tight">Reflect</h3>
      </div>
      <div className="flex gap-3">
      <Badge variant="secondary">12Hr 18Min</Badge>
      <Badge variant="secondary">12 March 2024</Badge>
      </div>
    </div>
  );
};

export default NavBar;
