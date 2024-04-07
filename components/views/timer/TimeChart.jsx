"use client";
import React, { Component, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Database from "tauri-plugin-sql-api";
import { formatTime } from "@/utils/utils";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const TimeChart = () => {
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
      setSeries([
        {
          name: "Time Spent",
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
        "SELECT date, timespent_in_sec AS value FROM timer"
      );

      return select;
    } catch (error) {
      console.log("error : ", error);
    }
  }

  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          <Chart options={options} series={series} type="area" width="500" />
        </div>
      </div>
    </div>
  );
};

export default TimeChart;
