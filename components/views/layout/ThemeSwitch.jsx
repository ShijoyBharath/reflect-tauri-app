"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


export function ThemeSwitch() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("violetdark")}>
          Violet Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("violetlight")}>
          Violet Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("reddark")}>
          Red Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("redlight")}>
          Red Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("bluedark")}>
          Blue Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("bluelight")}>
          Blue Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("cobaltdark")}>
          Cobalt Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("cobaltlight")}>
          Cobalt Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("yellowdark")}>
          Yellow Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("yellowlight")}>
          Yellow Light
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
