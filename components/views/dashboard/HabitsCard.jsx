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
import { Check, CheckCheck, Bolt } from "lucide-react";
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
import {
  Tooltip as Tool,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import EditHabitDialog from "./EditHabitDialog";
import { useQuery } from "@tanstack/react-query";

dayjs.extend(localeData);

const HabitsCard = ({ habit, description, calendarId }) => {
  const cal = new CalHeatmap();

  const { theme } = useThemeStore();

  const { todayGlobal } = useTodayStore();

  const reactquerykey = "get_data_habitscard_" + calendarId;
  const { isPending, error, data } = useQuery({
    queryKey: [reactquerykey],
    queryFn: get_data,
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  const rootComputedStyle = window.getComputedStyle(document.documentElement);

  var one = rootComputedStyle.getPropertyValue("--primary").trim();
  var two = rootComputedStyle.getPropertyValue("--secondary").trim();
  one = hslStringToHex(one);
  two = hslStringToHex(two);

  var existingCal = document.getElementById("calendar-" + calendarId);
  if (existingCal) {
    existingCal.innerHTML = "";
    // var svgTag = existingCal.querySelector("svg")
    // if (svgTag) {
    //   existingCal.removeChild(svgTag)
    // }
  }

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
            return (
              (value ? value + "/10 on " : "") +
              dayjsDate.format("dddd, MMMM D, YYYY")
            );
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

  function findMaxConsecutiveStreak(data) {
    const datesSet = new Set(data.map((obj) => obj.date)); // Remove duplicates
    const sortedDates = [...datesSet].sort(); // Sort dates

    let maxCount = 0;
    let currentCount = 0;
    let previousDate = null;

    sortedDates.forEach((date) => {
      const currentDate = new Date(date);
      if (
        previousDate &&
        (currentDate - previousDate) / (1000 * 60 * 60 * 24) === 1
      ) {
        currentCount++;
      } else {
        currentCount = 1;
      }
      maxCount = Math.max(maxCount, currentCount);
      previousDate = currentDate;
    });

    return maxCount;
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

      const todays_data = await db.select(
        "SELECT * FROM habitsdata WHERE uuid=? AND date=?",
        [calendarId, formatDate(todayGlobal)]
      );

      const start_date = await db.select("SELECT * FROM appconfig");

      var weekdates = getCurrent12Weeks(start_date[0].start_date, todayGlobal);

      return [select, weekdates[0], todays_data];
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
              {data[2].length !== 0 ? (
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
          <Badge variant="">Score : {findMaxScore(data[0])}%</Badge>
          <Badge variant="secondary">Streak : {findMaxConsecutiveStreak(data[0])}</Badge>
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
