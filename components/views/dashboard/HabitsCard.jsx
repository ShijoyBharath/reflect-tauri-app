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

dayjs.extend(localeData);

const HabitsCard = ({ habit, description, calendarId }) => {
  const cal = new CalHeatmap();

  const [completed, setCompleted] = useState(false);

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
                  (value ? value : "0") +
                  "/10 on " +
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
    });
  }, []);

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
      <CardFooter>
        {/* <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <Link size={18} />
            <p>13</p>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles size={18} />
            <p>57%</p>
          </div>
        </div> */}
      </CardFooter>
    </Card>
  );
};

export default HabitsCard;
