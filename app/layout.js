"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/views/layout/NavBar";
import SideBar from "@/components/views/layout/SideBar";
import { Toaster } from "@/components/ui/sonner";

import { useEffect, useState, useRef } from "react";
import Database from "tauri-plugin-sql-api";

const inter = Inter({ subsets: ["latin"] });
import { ThemeProvider } from "@/components/theme-provider";
import useThemeStore from "@/components/themeStore";
import { formatDate } from "@/utils/utils";

// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({ children }) {
  const [timer, setTimer] = useState(0)
  var { theme, setGlobalTheme } = useThemeStore();

  async function insert(today) {
    try {
      const db = await Database.load("sqlite:data.db");
      const result = await db.execute(
        "CREATE TABLE IF NOT EXISTS appconfig (id INTEGER PRIMARY KEY, start_date TEXT NOT NULL, theme TEXT NOT NULL, timer_in_sec INTEGER NOT NULL)"
      );
      const select = await db.select("SELECT COUNT(*) AS COUNT FROM appconfig");

      // initialize all tables for the app.
      const create_habits = await db.execute(
        "CREATE TABLE IF NOT EXISTS habits (id INTEGER PRIMARY KEY, uuid TEXT NOT NULL, habit TEXT NOT NULL, description TEXT NOT NULL, created_at TEXT NOT NULL)"
      );

      const create_habitsdata = await db.execute(
        "CREATE TABLE IF NOT EXISTS habitsdata (id INTEGER PRIMARY KEY, uuid TEXT NOT NULL, value INTEGER NOT NULL, date TEXT NOT NULL)"
      );

      const create_dailygoals = await db.execute(
        "CREATE TABLE IF NOT EXISTS dailygoals (id INTEGER PRIMARY KEY, goal TEXT NOT NULL, date TEXT NOT NULL)"
      );

      const create_weeklygoals = await db.execute(
        "CREATE TABLE IF NOT EXISTS weeklygoals (id INTEGER PRIMARY KEY, goal TEXT NOT NULL, start_date TEXT NOT NULL, end_date TEXT NOT NULL)"
      );

      const create_timer = await db.execute(
        "CREATE TABLE IF NOT EXISTS timer (id INTEGER PRIMARY KEY, timespent_in_sec INTEGER NOT NULL, flows INTEGER NOT NULL, date TEXT NOT NULL)"
      );
      // all tables created

      if (select[0].COUNT == 0) {
        const insert = await db.execute(
          "INSERT OR REPLACE INTO appconfig (id, start_date, theme, timer_in_sec) VALUES (1, ?, ?, ?)",
          [today, "light", 2700]
        );
        window.location.reload();
      }

      if (localStorage.getItem("refresh") == 0){
        localStorage.setItem("refresh", 1)
        window.location.reload()
      }

      const timer_data = await db.select("SELECT timer_in_sec FROM appconfig");
      setTimer(timer_data[0].timer_in_sec)


      const theme_loc = localStorage.getItem("theme");
      if (!theme_loc) {
        const root = document.documentElement;
        root.className = "";
        root.classList.add("light");
        localStorage.setItem("theme", "light");
        setGlobalTheme("light")
      } else {
        const root = document.documentElement;
        root.className = "";
        root.classList.add(theme_loc);
        setGlobalTheme(theme_loc)
      }

    } catch (error) {
      console.log("error : ", error);
    }
  }

  useEffect(() => {
    if (!localStorage.getItem("refresh")){
      localStorage.setItem("refresh", 0)
    }
    insert(formatDate(new Date()));
  }, []);

  const expiryTimestamp = new Date();
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + timer);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex flex-col h-screen w-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
          enableSystem
        >
          <NavBar expiryTimestamp={expiryTimestamp} />
          <div className="flex flex-1 overflow-hidden">
            <SideBar />
            <main className={inter.className + " grow overflow-y-auto"}>
              {children}
            </main>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
