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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FlowChart = () => {
  const [chartdata, setChartdata] = useState([]);

  useEffect(() => {
    get_data().then((data) => {
      var chart_data = data.map((item) => {
        return {
          uv: item.value,
          amt: item.date,
        };
      });
      setChartdata(chart_data);
    });
  }, []);

  async function get_data() {
    try {
      const db = await Database.load("sqlite:data.db");
      const select = await db.select("SELECT date, flows AS value FROM timer");

      return select;
    } catch (error) {
      console.log("error : ", error);
    }
  }

  return (
    <Card className="border-0">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>Flows</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-xs text-muted-foreground">+18% from yesterday</p>
        <div className="mt-4 h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartdata}>
              <Bar
                dataKey="uv"
                style={{
                  fill: "var(--theme-primary)",
                  opacity: 1,
                  // "--theme-primary": `hsl(${
                  //   theme?.cssVars[mode === "dark" ? "dark" : "light"]
                  //     .primary
                  // })`,
                }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default FlowChart;
