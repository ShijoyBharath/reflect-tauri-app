"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const themes = [
    "light",
    "green",
    "yellow",
    "orange",
    "salt",
    "red",
    "blue",
    "violet",
    "dark",
    "black",
    "emerald",
    "gold",
    "bronze",
    "vampire",
    "ruby",
    "midnight",
    "obsidian",
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  function setTheme(theme) {
    const root = document.documentElement;
    root.className = "";
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }

  return (
    <div className="flex gap-3">
      {mounted ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Palette className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" side="right">
            {themes.map((color, index) => {
              return (
                <DropdownMenuItem key={index} onClick={() => setTheme(color)}>
                  {color}
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <>
          <Skeleton className="h-8 w-full" />
        </>
      )}
    </div>
  );
}
