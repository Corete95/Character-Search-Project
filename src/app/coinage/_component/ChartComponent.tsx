"use client";

import React, { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { getChartOptions } from "@/app/coinage/_constants/chartOptions";
import { conversion } from "@/app/coinage/_constants/conversion";
import { CoinDataType } from "@/types/apis/coninage.type";
import dynamic from "next/dynamic";
import ApexCharts from "apexcharts";

const ChartApexchart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface ChartComponentProps {
  data: CoinDataType[];
}

const ChartComponent: React.FC<ChartComponentProps> = ({ data }) => {
  const chartRef = useRef<ApexCharts | any>(null);
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  const validatedTheme =
    theme === "light" || theme === "dark" ? theme : "light";
  const options = getChartOptions(validatedTheme, data, chartRef);
  const series = [{ name: "Candlestick", data: conversion(data) }];

  const handleWheel = (event: WheelEvent) => {
    event.preventDefault();
    if (chartRef.current) {
      const { maxX, minX } = chartRef.current.w.globals;
      const zoomFactor = 0.05;
      const deltaY = event.deltaY;

      if (deltaY < 0) {
        const newMin = minX + (maxX - minX) * zoomFactor;
        const newMax = maxX - (maxX - minX) * zoomFactor;
        chartRef.current.zoomX(newMin, newMax);
      } else {
        const newMin = minX - (maxX - minX) * zoomFactor;
        const newMax = maxX + (maxX - minX) * zoomFactor;
        chartRef.current.zoomX(newMin, newMax);
      }
    }
  };

  useEffect(() => {
    const chartContainer = chartContainerRef.current;
    if (chartContainer) {
      chartContainer.addEventListener("wheel", handleWheel);
    }
    return () => {
      if (chartContainer) {
        chartContainer.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  return (
    <div ref={chartContainerRef}>
      {data && data.length > 0 && (
        <ChartApexchart
          options={options}
          series={series}
          type="candlestick"
          width={"100%"}
          height={350}
        />
      )}
    </div>
  );
};

export default ChartComponent;
