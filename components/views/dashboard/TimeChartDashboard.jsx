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

const TimeChartDashboard = () => {
  const [score, setScore] = useState(10);
  const [chartdata, setChartdata] = useState([]);

  useEffect(() => {
    get_data().then((data) => {
      var ser = data.map((item) => item.value);
      var chart_data = data.map((item) => {
        return {
          uv: item.value,
          amount: item.value,
        };
      });
      setChartdata(chart_data);
      setScore(
        ser.reduce((sum, currentValue) => sum + currentValue, 0).toFixed(1)
      );
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

  return (
    <div className="app flex gap-4 justify-center items-center  m-4 p-9 rounded-lg bg-background">
      <LineChart
        width={500}
        height={300}
        data={chartdata}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <Tooltip />
        <Line
          type="monotone"
          dataKey="pv"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
      </LineChart>
      <div className="flex flex-col gap-3">
        <h1 className="scroll-m-20 text-5xl font-extrabold tracking-tight lg:text-7xl">
          {score}%
        </h1>
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Overall Score
        </h4>
      </div>
    </div>
  );
};

export default TimeChartDashboard;
