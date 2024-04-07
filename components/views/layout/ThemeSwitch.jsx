"use client";

import * as React from "react";
import { Palette, SunIcon, MoonIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex flex-col gap-3">
      {mounted ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Palette className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" side="bottom">
            <DropdownMenuItem onClick={() => setTheme("violet")}>
              Violet
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("red")}>
              Red
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("blue")}>
              Blue
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("cobalt")}>
              Cobalt
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("yellow")}>
              Yellow
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <>
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
        </>
      )}

      <div className="space-y-1.5">
        <Label className="text-xs">Mode</Label>
        <div className="grid grid-cols-3 gap-2">
          {mounted ? (
            <>
              <Button
                variant={"outline"}
                size="sm"
                onClick={() => setTheme("light")}
              >
                <SunIcon className="mr-1 -translate-x-1" />
                Light
              </Button>
              <Button
                variant={"outline"}
                size="sm"
                onClick={() => setTheme("dark")}
              >
                <MoonIcon className="mr-1 -translate-x-1" />
                Dark
              </Button>
            </>
          ) : (
            <>
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
