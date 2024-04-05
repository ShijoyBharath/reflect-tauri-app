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
import CalendarLabel from "cal-heatmap/plugins/CalendarLabel";
import SlideUpCard from "./SlideUpCard";
import dayjs from "dayjs";
import * as localeData from 'dayjs/plugin/localeData';


dayjs.extend(localeData)

const HabitsCard = ({ habit, description, calendarId }) => {

  useEffect(() => {
    const cal = new CalHeatmap();

    cal.paint(
      {
        date: { start: new Date("2012-01-01") },
        range: 5,
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
            text: () => dayjs().localeData().weekdaysMin(),
            padding: [25, 0, 0, 0],
          },
        ],
      ]
    );
  }, [calendarId]);


  return (
    <Card className="">
      <CardHeader>
        <div className="flex justify-between items-center gap-3">
          <SlideUpCard habit={habit} description={description} />
          <Dialog>
            <DialogTrigger asChild>
              <Button><Check /></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <MarkAsCompleteDialog calendarId={calendarId} />
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div id={calendarId}></div>
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
