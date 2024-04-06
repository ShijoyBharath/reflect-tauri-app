"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import CalHeatmap from "cal-heatmap";
import "cal-heatmap/cal-heatmap.css";
import { Link, Sparkles, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import MarkAsCompleteDialog from "./MarkAsCompleteDialog";
import LegendLite from "cal-heatmap/plugins/LegendLite";
import Legend from "cal-heatmap/plugins/Legend";
import Tooltip from "cal-heatmap/plugins/Tooltip";
import CalendarLabel from "cal-heatmap/plugins/CalendarLabel";
import SlideUpCard from "./SlideUpCard";
import dayjs from "dayjs";
import * as localeData from "dayjs/plugin/localeData";
import Database from "tauri-plugin-sql-api";

dayjs.extend(localeData);

const HabitsCard = ({ habit, description, calendarId }) => {
  var cal = new CalHeatmap();

  useEffect(() => {
    get_data().then(
      (data) =>
        cal.paint(
          {
            data: {
              source: data[0],
              type: "json",
              x: "date",
              y: "value",
              groupY: "max",
            },
            date: { start: data[1] },
            range: 6,
            scale: {
              color: {
                type: "threshold",
                range: ["#14432a", "#166b34", "#37a446", "#4dd05a"],
                domain: [10, 20, 30],
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
            itemSelector: "#" + "calendar-" + calendarId,
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
        )

      //   cal.paint(
      //     {
      //       data: {
      //         source: data,
      //         type: "json",
      //         x: "date",
      //         y: "value",
      //         // groupY: 'max',
      //       },
      //       date: { start: new Date(start_date) },
      //       range: 8,
      //       scale: {
      //         color: {
      //           type: "quantize",
      //           scheme: "Oranges",
      //           domain: [0, 1, 2, 3, 4, 5, 6, 7],
      //         },
      //       },
      //       domain: {
      //         type: "month",
      //       },
      //       subDomain: { type: "day", radius: 2 },
      //       itemSelector: "#" + "calendar-" + calendarId,
      //     },
      //     [
      //       [
      //         Tooltip,
      //         {
      //           text: function (date, value, dayjsDate) {
      //             return (
      //               (value ? value + "/10" : "0/10") +
      //               " on " +
      //               dayjsDate.format("LL")
      //             );
      //           },
      //         },
      //       ],
      //       [
      //         Legend,
      //         {
      //           tickSize: 0,
      //           width: 100,
      //           itemSelector: "#ex-wind-legend",
      //           label: "Seattle wind (km/h)",
      //         },
      //       ],
      //     ]
      //   )
    );
  }, []);

  const getCurrent12Weeks = (startDate) => {
    const today = new Date();
    for (var d = new Date(startDate); d <= today; d.setDate(d.getDate() + 84)) {
      var temp_date = new Date(d);
      var week_start = new Date(d);
      var week_end = new Date(temp_date.setDate(temp_date.getDate() + 83));

      if (today >= week_start && today <= week_end) {
        return [formatDate(week_start), formatDate(week_end)];
      }
    }
  };

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  async function get_data() {
    try {
      const db = await Database.load("sqlite:data.db");
      const select = await db.select("SELECT * FROM habitsdata WHERE uuid=?", [
        calendarId,
      ]);

      const start_date = await db.select("SELECT * FROM appconfig");

      var weekdates = getCurrent12Weeks(start_date[0].start_date);

      return [select, weekdates[0]];
    } catch (error) {
      console.log("error : ", error);
    }
  }

  return (
    <Card className="">
      <CardHeader>
        <div className="flex justify-between items-center gap-3">
          <SlideUpCard habit={habit} description={description} />
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Check />
              </Button>
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
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <Link size={18} />
            <p>13</p>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles size={18} />
            <p>57%</p>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default HabitsCard;
