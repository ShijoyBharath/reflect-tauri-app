"use client";
import React, { Component, useEffect, useState } from "react";
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


const TimeChart = () => {
  const [chartdata, setChartdata] = useState([]);
  const { theme, setGlobalTheme } = useThemeStore();

  useEffect(() => {
    get_data().then((data) => {
      var chart_data = data.map((item) => {
        return {
          uv: item.value,
          amount: item.value,
        };
      });
      setChartdata(chart_data);
    });
  }, []);

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
    <Card className="border-0">
      <CardHeader>
        <CardTitle>Daily Time</CardTitle>
        <CardDescription>
          Your are ahead of where you normally are.
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="h-[200px]">
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
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Average
                            </span>
                            <span className="font-bold text-muted-foreground">
                              {(payload[0].value/360).toFixed(1)}
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Today
                            </span>
                            <span className="font-bold">
                              {payload[0].value}
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
                dataKey="uv"
                strokeWidth={2}
                activeDot={{
                  r: 8,
                  style: { fill: primaryColor },
                }}
                style={
                  {
                    stroke: primaryColor,
                    // "--theme-primary": `hsl(${
                    //   theme?.cssVars[mode === "dark" ? "dark" : "light"].primary
                    // })`,
                  }
                }
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default TimeChart;
