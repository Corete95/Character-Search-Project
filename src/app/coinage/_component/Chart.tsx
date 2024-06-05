"use client";

import React, { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import ApexCharts from "apexcharts";
import { useTheme } from "next-themes";
import { useCoinageQuery } from "@/hooks/queries/useCoinageQuery";
import { getChartOptions } from "@/app/coinage/_constants/chartOptions";
const ChartApexchart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const Chart = () => {
  const chartRef = useRef<ApexCharts | any>(null);
  const { theme } = useTheme();
  const { data, isLoading, isError } = useCoinageQuery();

  const validatedTheme =
    theme === "light" || theme === "dark" ? theme : "light";
  const options = getChartOptions(validatedTheme, data, chartRef);
  const series = [{ name: "Candlestick", data: data }];

  const handleWheel = (event: WheelEvent) => {
    if (chartRef.current) {
      const { maxX, minX } = chartRef.current.w.globals;
      const zoomFactor = 0.025;
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
    window.addEventListener("wheel", handleWheel);
    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  if (isLoading) return <div>로딩...</div>;
  if (isError) return <div>에러</div>;

  return (
    <div>
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

export default Chart;
