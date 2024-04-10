"use client";
import React, { Component, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Database from "tauri-plugin-sql-api";
import {
  BarChart,
  Bar,
  Cell,
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
import useTimerStore from "@/components/timerStore";
import { Flower2 } from "lucide-react";

const FlowChart = () => {
  const [chartdata, setChartdata] = useState([]);
  const [flows, setFlows] = useState([]);
  const { theme, setGlobalTheme } = useThemeStore();
  const { refreshTimer } = useTimerStore();

  useEffect(() => {
    get_data().then((data) => {
      var chart_data = data.map((item) => {
        return {
          uv: item.value,
          amt: item.date,
        };
      });
      var flow_data = data.map((item) => {
        return item.value;
      });
      setFlows(flow_data.reduce((acc, currentValue) => acc + currentValue, 0));
      setChartdata(chart_data);
    });
  }, [refreshTimer]);

  async function get_data() {
    try {
      const db = await Database.load("sqlite:data.db");
      const select = await db.select("SELECT date, flows AS value FROM timer");

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
    <Card className="border-0 w-1/3">
      <CardHeader>
        <CardTitle>Flows</CardTitle>
        <CardDescription>Total {flows} flows</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mt-4 h-[200px]">
          {chartdata.length !== 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartdata}>
                <Bar
                  dataKey="uv"
                  style={{
                    fill: primaryColor,
                    opacity: 1,
                  }}
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex flex-col justify-around items-center text-center">
              <Flower2 size={90} />
              <p className="text-base text-muted-foreground py-5">
                Set a timer to view the number of flow sessions!
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FlowChart;
