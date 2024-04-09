"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
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
import { Palette } from "lucide-react";
import useDashboardStore from "@/components/dashboardStore";

export function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);

  const {refreshDashboard, setRefreshDashboard} = useDashboardStore();

  const themes = [
    "light",
    "green",
    "yellow",
    "orange",
    "rose",
    "red",
    "blue",
    "violet",
    "cobalt",
    "lavender",
    "purple",
    "tangerine",
    "cocoa",
    "berry",
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
    setRefreshDashboard(refreshDashboard + 1);
    localStorage.setItem("theme", theme);
  }

  return (
    <div className="flex gap-3">
      {mounted ? (
        <Select
          value={localStorage.getItem("theme")}
          onValueChange={(val) => {
            setTheme(val);
          }}
        >
          <SelectTrigger className="w-[180px] flex justify-around">
            <Palette />
            <SelectValue placeholder="Change App Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Themes</SelectLabel>
              {themes.map((color, index) => {
                return (
                  <SelectItem key={index} value={color}>
                    {color}
                  </SelectItem>
                );
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
