"use client";
import React, { Component, useEffect, useState } from "react";
// import Chart from "react-apexcharts";
import dynamic from 'next/dynamic'
import Database from "tauri-plugin-sql-api";

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const TimeChartDashboard = () => {
  

  const [series, setSeries] = useState([])
  const [categories, setCategories] = useState([])

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
      categories: categories,
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
  };

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  
  useEffect(()=>{
    get_data().then((data)=>{
      var ser = data.map((item)=>item.value)
      var cat = data.map((item)=>item.date)
      setCategories(cat)
      setSeries([{
        name : "series-1",
        data : ser
      }])
    })
  })
  
  const getCurrent12Weeks = (startDate) => {
    const today = new Date();
    for (var d = new Date(startDate); d <= today; d.setDate(d.getDate() + 84)) {
      var temp_date = new Date(d);
      var week_start = new Date(d);
      var week_end = new Date(temp_date.setDate(temp_date.getDate() + 83));

      if (today >= week_start && today <= week_end) {
        return [formatDate(week_start), formatDate(week_end)];
      }
    }
  };

  async function get_data() {
    try {
      const db = await Database.load("sqlite:data.db");
      const select = await db.select("SELECT date, AVG(value) AS value FROM habitsdata GROUP BY date",);

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

export default TimeChartDashboard;
