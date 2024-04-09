"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import CalHeatmap from "cal-heatmap";
import "cal-heatmap/cal-heatmap.css";
import {
  Link,
  Sparkles,
  Check,
  CircleCheckBig,
  CheckCheck,
  Bolt,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import MarkAsCompleteDialog from "./MarkAsCompleteDialog";
import LegendLite from "cal-heatmap/plugins/LegendLite";
import Legend from "cal-heatmap/plugins/Legend";
import Tooltip from "cal-heatmap/plugins/Tooltip";
import CalendarLabel from "cal-heatmap/plugins/CalendarLabel";
import dayjs from "dayjs";
import * as localeData from "dayjs/plugin/localeData";
import Database from "tauri-plugin-sql-api";
import { hslStringToHex, getCurrent12Weeks, formatDate } from "@/utils/utils";
import useThemeStore from "@/components/themeStore";
import useTodayStore from "@/components/todayStore";
import useDashboardStore from "@/components/dashboardStore";
import {
  Tooltip as Tool,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import EditHabitDialog from "./EditHabitDialog";

dayjs.extend(localeData);

const HabitsCard = ({ habit, description, calendarId }) => {
  const cal = new CalHeatmap();

  const [completed, setCompleted] = useState(false);
  const [streak, setStreak] = useState(0);
  const [score, setScore] = useState(0);

  const { theme, setGlobalTheme } = useThemeStore();
  const { todayGlobal } = useTodayStore();
  const { refreshDashboard } = useDashboardStore();

  const root = document.documentElement;
  const classes = Array.from(root.classList); // Convert classList to an array

  useEffect(() => {
    if (theme === classes[0] || refreshDashboard) {
      window.location.reload();
    }
  }, [theme, refreshDashboard]);

  useEffect(() => {
    get_data().then((data) => {
      const rootComputedStyle = window.getComputedStyle(
        document.documentElement
      );

      var one = rootComputedStyle.getPropertyValue("--primary").trim();
      var two = rootComputedStyle.getPropertyValue("--secondary").trim();
      one = hslStringToHex(one);
      two = hslStringToHex(two);
      cal.paint(
        {
          data: {
            source: data[0],
            type: "json",
            x: "date",
            y: "value",
            groupY: "max",
            defaultValue: 0,
          },
          date: { start: data[1] },
          range: 6,
          scale: {
            opacity: {
              baseColor: one,
              type: "linear",
              domain: [-1, 10],
            },
          },
          domain: {
            type: "month",
            gutter: 4,
            label: { text: "MMM", textAlign: "start", position: "top" },
          },
          subDomain: {
            type: "ghDay",
            radius: 2,
            width: 11,
            height: 11,
            gutter: 4,
          },
          itemSelector: "#calendar-" + calendarId,
        },
        [
          [
            Tooltip,
            {
              text: function (date, value, dayjsDate) {
                return value
                  ? value + "/10 on " + dayjsDate.format("dddd, MMMM D, YYYY")
                  : "Let's make the most of this day";
              },
            },
          ],
          [
            LegendLite,
            {
              includeBlank: true,
              itemSelector: "#ex-ghDay-legend",
              radius: 2,
              width: 11,
              height: 11,
              gutter: 4,
            },
          ],
          [
            CalendarLabel,
            {
              width: 30,
              textAlign: "start",
              text: () =>
                dayjs.weekdaysShort().map((d, i) => (i % 2 == 0 ? "" : d)),
              padding: [25, 0, 0, 0],
            },
          ],
        ]
      );
    });
  }, []);

  function isOneDayApart(date1String, date2String) {
    // Convert date strings to Date objects
    const date1 = new Date(date1String);
    const date2 = new Date(date2String);

    // Calculate the difference in milliseconds
    const differenceInMs = Math.abs(date2 - date1);

    // Convert milliseconds to days
    const differenceInDays = differenceInMs / (1000 * 60 * 60 * 24);

    // Check if the difference is exactly 1 day
    return differenceInDays === 1;
  }

  function findMaxConsecutiveStreak(data) {
    let maxStreak = 0;
    let currentStreak = 0;

    for (let i = 0; i < data.length; i++) {
      // Check if the value is greater than 0
      if (data[i].value > 0) {
        // If the current date is consecutive with the previous one
        if (i > 0 && isOneDayApart(data[i - 1].date, data[i].date)) {
          currentStreak++;
        } else {
          currentStreak = 1; // Start a new streak
        }

        // Update the max streak if the current streak is greater
        if (currentStreak > maxStreak) {
          maxStreak = currentStreak;
        }
      } else {
        // Reset the streak if the value is not greater than 0
        currentStreak = 0;
      }
    }

    return maxStreak;
  }

  function findMaxScore(data) {
    if (data.length === 0) {
      return 0; // Return 0 if there are no elements in the array
    }

    // Convert each value to percentage
    const percentages = data.map((item) => (item.value / 10) * 100);

    // Calculate the sum of all percentages
    const sum = percentages.reduce((acc, cur) => acc + cur, 0);

    // Calculate the average percentage
    const averagePercentage = sum / data.length;

    return averagePercentage.toFixed(1);
  }

  async function get_data() {
    try {
      const db = await Database.load("sqlite:data.db");
      const select = await db.select("SELECT * FROM habitsdata WHERE uuid=?", [
        calendarId,
      ]);
      setStreak(findMaxConsecutiveStreak(select));
      setScore(findMaxScore(select));
      const todays_data = await db.select(
        "SELECT * FROM habitsdata WHERE uuid=? AND date=?",
        [calendarId, formatDate(todayGlobal)]
      );

      if (todays_data.length !== 0) {
        setCompleted(true);
      }

      const start_date = await db.select("SELECT * FROM appconfig");

      var weekdates = getCurrent12Weeks(start_date[0].start_date, todayGlobal);

      return [select, weekdates[0]];
    } catch (error) {
      console.log("error : ", error);
    }
  }

  return (
    <Card className="border-0">
      <CardHeader>
        <div className="flex justify-between items-center gap-3">
          <div className="flex flex-col items-start">
            <CardTitle>{habit}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              {completed ? (
                <Button variant="secondary">
                  <CheckCheck />
                </Button>
              ) : (
                <Button>
                  <Check />
                </Button>
              )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <MarkAsCompleteDialog calendarId={calendarId} />
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div id={"calendar-" + calendarId}></div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="flex gap-3">
          <Badge variant="">Score : {score}%</Badge>
          <Badge variant="secondary">Streak : {streak}</Badge>
        </div>
        <Dialog>
          <TooltipProvider>
            <Tool>
              <TooltipTrigger asChild>
                <DialogTrigger asChild>
                  <Button className="w-5 h-5" variant="ghost" size="icon">
                    <Bolt />
                  </Button>
                </DialogTrigger>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Edit Habit</p>
              </TooltipContent>
            </Tool>
          </TooltipProvider>
          <DialogContent>
            <EditHabitDialog
              calendarId={calendarId}
              curHabit={habit}
              curDescription={description}
            />
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default HabitsCard;
