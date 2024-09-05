"use client";
import React from "react";
import { ChartTooltip } from "./ChartTooltip";
import { useChart } from "@/hooks/useChart";

interface ChartProps {
  data: Array<{ time: string; price: number }>;
}

const ChartComponent: React.FC<ChartProps> = ({ data }) => {
  const { chartContainerRef, colors, tooltipVisible, tooltipData } =
    useChart(data);

  return (
    <div ref={chartContainerRef} className="relative h-[400px] w-full">
      <ChartTooltip
        visible={tooltipVisible}
        data={tooltipData}
        colors={colors}
        chartContainerRef={chartContainerRef}
      />
    </div>
  );
};

export default ChartComponent;
