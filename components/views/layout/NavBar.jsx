import React from "react";
import { Circle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const NavBar = () => {
  return (
    <div className="flex justify-between m-5">
      <div className="flex items-center gap-3">
        <Circle />
        <h3 className="text-2xl font-semibold tracking-tight">Reflect</h3>
      </div>
      <div className="flex gap-3">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Badge className="p-3" variant="secondary">12Hr 18Min</Badge>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Time left for this day</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Badge variant="secondary">12 March 2024</Badge>
      </div>
    </div>
  );
};

export default NavBar;
