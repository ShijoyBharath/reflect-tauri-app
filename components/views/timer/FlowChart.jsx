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
    <div className="m-4">
      <BarChart width={150} height={40} data={chartdata}>
        <Bar dataKey="uv" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default FlowChart;
