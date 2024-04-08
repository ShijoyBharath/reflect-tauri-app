"use client";
import React, { Component, useEffect, useState } from "react";
import dynamic from "next/dynamic";
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
import { hslStringToHex } from "@/utils/utils";
import useThemeStore from "@/components/themeStore";

const TimeChartDashboard = () => {
  const [score, setScore] = useState(10);
  const [chartdata, setChartdata] = useState([]);
  const { theme, setGlobalTheme } = useThemeStore();

  useEffect(() => {
    get_data().then((data) => {
      var ser = data.map((item) => item.value);
      var chart_data = data.map((item) => {
        return {
          value: item.value,
          randomval: item.value * 0.1,
          date: item.date,
        };
      });
      setChartdata(chart_data);
      setScore(
        ser.reduce((sum, currentValue) => sum + currentValue, 0).toFixed(1)
      );
      // var score_data = 0;
      // chart_data.forEach((item)=>{
      //   score_data = score_data + item.value
      // })
      // setScore(score_data/chart_data.length)
    });
  }, []);

  async function get_data() {
    try {
      const db = await Database.load("sqlite:data.db");
      const select = await db.select(
        "SELECT date, AVG(value) AS value FROM habitsdata GROUP BY date"
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
    <Card className="border-0 m-4">
      <CardHeader>
        <CardTitle className="flex justify-between gap-3">
          <div className="flex flex-col">
            Progress
            <CardDescription className="font-medium">
              See how consistent you truly are.
            </CardDescription>
          </div>
          <div className="flex flex-col">
            <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight">
              {score}%
            </h1>
            <h4 className="scroll-m-20 text-lg font-semibold tracking-tight">
              Overall Score
            </h4>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="h-[200px] lg:h-[425px] sm:h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartdata}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 0,
              }}
            >
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid grid-cols-1 gap-2">
                          {/* <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Progress
                            </span>
                            <span className="font-bold text-muted-foreground">
                              {payload[0].payload.randomval}
                            </span>
                          </div> */}
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                            {new Date(payload[0].payload.date).toLocaleDateString('en-GB')}
                            </span>
                            <span className="font-bold">
                              Score : {payload[0].payload.value.toFixed(1)}
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
                dataKey="value"
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
              {/* <Line
                type="monotone"
                strokeWidth={2}
                dataKey="randomval"
                activeDot={{
                  r: 6,
                  style: { fill: primaryColor, opacity: 0.25 },
                }}
                style={{
                  stroke: primaryColor,
                  opacity: 0.25,
                  // "--theme-primary": `hsl(${
                  //   theme?.cssVars[mode === "dark" ? "dark" : "light"].primary
                  // })`,
                }}
              /> */}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default TimeChartDashboard;
