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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useThemeStore from "@/components/themeStore";

export function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const themes = [
    "light",
    "green",
    "yellow",
    "orange",
    "rose",
    "red",
    "blue",
    "cobalt",
    "violet",
    "purple",
    "tangerine",
    "lavender",
    "twilight",
    "dark",
    "black",
    "emerald",
    "mint",
    "gold",
    "bronze",
    "vampire",
    "ruby",
    "lava",
    "midnight",
    "obsidian",
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  var { theme, setGlobalTheme } = useThemeStore();

  function setTheme(theme) {
    const root = document.documentElement;
    root.className = "";
    root.classList.add(theme);
    setGlobalTheme(theme);
    localStorage.setItem("theme", theme);
  }

  return (
    <div className="flex gap-3">
      {mounted ? (
        <Select value={localStorage.getItem("theme")} onValueChange={(val)=>{setTheme(val)}}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Change App Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Themes</SelectLabel>
              {themes.map((color, index) => {
                return <SelectItem key={index} value={color}>{color}</SelectItem>;
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      ) : (
        <>
          <Skeleton className="h-8 w-full" />
        </>
      )}
    </div>
  );
}
