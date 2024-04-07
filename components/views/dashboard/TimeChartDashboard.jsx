"use client";
import React, { Component, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Database from "tauri-plugin-sql-api";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const TimeChartDashboard = () => {
  const [score, setScore] = useState(10);

  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState({
    chart: {
      id: "area-chart",
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: ["0"],
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
    },
    stroke: {
      curve: "smooth",
    },
    fill: {
      type: "gradient",
    },
    grid: {
      show: false,
    },
  });

  useEffect(() => {
    get_data().then((data) => {
      var ser = data.map((item) => item.value);
      var cat = data.map((item) => item.date);
      setScore(ser.reduce((sum, currentValue) => sum + currentValue, 0).toFixed(1))
      setSeries([
        {
          name: "Overall Score",
          data: ser,
        },
      ]);
      setOptions({
        chart: {
          id: "area-chart",
          toolbar: {
            show: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          categories: cat,
          axisTicks: {
            show: false,
          },
          axisBorder: {
            show: false,
          },
        },
        stroke: {
          curve: "smooth",
        },
        fill: {
          type: "gradient",
        },
        grid: {
          show: false,
        },
      });
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
    <div className="app flex gap-4 justify-center items-center  m-4 p-9 rounded-lg bg-white">
      <div className="row">
        <div className="mixed-chart">
          <Chart options={options} series={series} type="area" width="500" />
        </div>
      </div>
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
