"use client";
import React, { useEffect, useState } from "react";
import Database from "tauri-plugin-sql-api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { hslStringToHex, formatTime } from "@/utils/utils";
import useThemeStore from "@/components/themeStore";
import useTimerStore from "@/components/timerStore";
import { Sprout } from "lucide-react";

const TimeChart = () => {
  const [chartdata, setChartdata] = useState([]);
  const [totalTime, setTotalTime] = useState(0);
  const { theme, setGlobalTheme } = useThemeStore();
  const { refreshTimer } = useTimerStore();


  useEffect(() => {
    get_data().then((data) => {
      var chart_data = data.map((item) => {
        return {
          time: item.value,
          date: item.date,
        };
      });
      var total_time = data.map((item) => {
        return item.value;
      });
      setTotalTime(
        total_time.reduce((acc, currentValue) => acc + currentValue, 0)
      );
      setChartdata(chart_data);
    });
  }, [refreshTimer]);

  async function get_data() {
    try {
      const db = await Database.load("sqlite:data.db");
      const select = await db.select(
        "SELECT date, timespent_in_sec AS value FROM timer"
      );

      return select;
    } catch (error) {
      console.log("error : ", error);
    }
  }

  const [primaryColor, setPrimaryColor] = useState("");

  useEffect(() => {
    const rootComputedStyle = window.getComputedStyle(document.documentElement);

    const primaryValue = rootComputedStyle.getPropertyValue("--primary").trim();
    setPrimaryColor(hslStringToHex(primaryValue));
  }, [theme]);

  return (
    <Card className="border-0 w-2/3">
      <CardHeader>
        <CardTitle>Daily Time</CardTitle>
        <CardDescription>
          Total time spent {formatTime(totalTime)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          {chartdata.length !== 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartdata}
                margin={{
                  top: 5,
                  right: 10,
                  left: 10,
                  bottom: 10,
                }}
              >
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                          <div className="grid grid-cols-1 gap-2">
                            <div className="flex flex-col">
                              <span className="text-[0.70rem] uppercase text-muted-foreground">
                                {new Date(
                                  payload[0].payload.date
                                ).toLocaleDateString("en-GB")}
                              </span>
                              <span className="font-bold">
                                {formatTime(payload[0].payload.time)}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    }

                    return null;
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="time"
                  strokeWidth={2}
                  activeDot={{
                    r: 8,
                    style: { fill: primaryColor },
                  }}
                  style={{
                    stroke: primaryColor,
                    // "--theme-primary": `hsl(${
                    //   theme?.cssVars[mode === "dark" ? "dark" : "light"].primary
                    // })`,
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex flex-col justify-around items-center text-center">
              <Sprout size={110} />
              <p className="text-base text-muted-foreground py-5">
                Set a timer to see how much time you spend!
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TimeChart;
