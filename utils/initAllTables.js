import Database from "tauri-plugin-sql-api";
import { formatDate } from "@/utils/utils";

export async function init_tables() {
  try {
    const db = await Database.load("sqlite:data.db");

    // initialize all tables for the app.
    await db.execute(
      "CREATE TABLE IF NOT EXISTS appconfig (id INTEGER PRIMARY KEY, start_date TEXT NOT NULL, theme TEXT NOT NULL, timer_in_sec INTEGER NOT NULL, activated INTEGER NOT NULL)"
    );

    await db.execute(
      "CREATE TABLE IF NOT EXISTS habits (id INTEGER PRIMARY KEY, uuid TEXT NOT NULL, habit TEXT NOT NULL, description TEXT NOT NULL, created_at TEXT NOT NULL)"
    );

    await db.execute(
      "CREATE TABLE IF NOT EXISTS habitsdata (id INTEGER PRIMARY KEY, uuid TEXT NOT NULL, value INTEGER NOT NULL, date TEXT NOT NULL)"
    );

    await db.execute(
      "CREATE TABLE IF NOT EXISTS dailygoals (id INTEGER PRIMARY KEY, goal TEXT NOT NULL, date TEXT NOT NULL)"
    );

    await db.execute(
      "CREATE TABLE IF NOT EXISTS weeklygoals (id INTEGER PRIMARY KEY, goal TEXT NOT NULL, start_date TEXT NOT NULL, end_date TEXT NOT NULL)"
    );

    await db.execute(
      "CREATE TABLE IF NOT EXISTS timer (id INTEGER PRIMARY KEY, timespent_in_sec INTEGER NOT NULL, flows INTEGER NOT NULL, date TEXT NOT NULL)"
    );
    // all tables created

    const select = await db.select("SELECT COUNT(*) AS COUNT FROM appconfig");
    if (select[0].COUNT == 0) {
      const insert = await db.execute(
        "INSERT OR REPLACE INTO appconfig (id, start_date, theme, timer_in_sec, activated) VALUES (1, ?, ?, ?, 0)",
        [formatDate(new Date()), "light", 2700]
      );
      localStorage.setItem("helper", 0);
    //   window.location.reload();
    }

    await insert(formatDate(new Date()));
  } catch (error) {
    console.log(error);
  }
}

async function insert(today) {
  try {
    const db = await Database.load("sqlite:data.db");

    // const select = await db.select("SELECT COUNT(*) AS COUNT FROM appconfig");
    // if (select[0].COUNT == 0) {
    //   const insert = await db.execute(
    //     "INSERT OR REPLACE INTO appconfig (id, start_date, theme, timer_in_sec) VALUES (1, ?, ?, ?)",
    //     [today, "light", 2700]
    //   );
    //   window.location.reload();
    // }

    const theme_loc = localStorage.getItem("theme");
    const timer_loc = localStorage.getItem("timer_in_sec");

    if (!timer_loc) {
      localStorage.setItem("timer_in_sec", 2700);
    }

    if (!theme_loc) {
      const root = document.documentElement;
      root.className = "";
      root.classList.add("light");
      localStorage.setItem("theme", "light");
      setGlobalTheme("light");
    } else {
      const root = document.documentElement;
      root.className = "";
      root.classList.add(theme_loc);
      setGlobalTheme(theme_loc);
    }
  } catch (error) {
    console.log("error : ", error);
  }
}
