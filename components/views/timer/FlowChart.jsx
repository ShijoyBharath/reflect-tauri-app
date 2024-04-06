"use client";
import React, { Component } from "react";
// import Chart from "react-apexcharts";
import dynamic from 'next/dynamic'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
import Database from "tauri-plugin-sql-api";

const FlowChart = () => {
  const options = {
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
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
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
      type: "solid",
    },
    grid: {
      show: false,
    },
  };
  const series = [
    {
      name: "series-1",
      data: [30, 40, 45, 50, 49, 60, 70, 91],
    },
  ];



  async function get_data(start_date, end_date) {
    try {
      const db = await Database.load("sqlite:data.db");
      const select = await db.select(
        "SELECT * FROM timer WHERE DATE(date) BETWEEN DATE(?) AND DATE(?)",
        [start_date, end_date]
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
          <Chart options={options} series={series} type="bar" width="500" />
        </div>
      </div>
    </div>
  );
};

export default FlowChart;
