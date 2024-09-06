import React, { useEffect, useRef } from "react";
import { CandleDataType } from "@/types/apis/coninage.type";

interface ChartTooltipProps {
  visible: boolean;
  data: {
    dataPoint: CandleDataType;
    point: { x: number; y: number };
  } | null;
  colors: {
    upColor: string;
    downColor: string;
    tooltipBackground: string;
    tooltipTextColor: string;
    tooltipBorder: string;
  };
  chartContainerRef: React.RefObject<HTMLDivElement>;
}

export const ChartTooltip: React.FC<ChartTooltipProps> = ({
  visible,
  data,
  colors,
  chartContainerRef,
}) => {
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!tooltipRef.current) return;

    const tooltip = tooltipRef.current;
    Object.assign(tooltip.style, {
      position: "absolute",
      display: visible ? "block" : "none",
      padding: "8px",
      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
      fontSize: "12px",
      pointerEvents: "none",
      zIndex: "1000",
      backgroundColor: colors.tooltipBackground,
      color: colors.tooltipTextColor,
      border: `1px solid ${colors.tooltipBorder}`,
      borderRadius: "4px",
    });

    if (visible && data) {
      const { dataPoint, point } = data;
      const changeColor =
        dataPoint.change >= 0 ? colors.upColor : colors.downColor;
      tooltip.innerHTML = `
        <div style="display:flex; flex-direction:column; justify-content:center; align-items:center; text-align:center;">
          <div style="font-size:16px">⏱️ ${dataPoint.time}</div>
          <hr/>
          <div style="font-weight:bold; font-size:16px">${dataPoint.close.toLocaleString("ko-KR")}원</div>
          <div style="color: ${changeColor}">
            ${dataPoint.change.toLocaleString("ko-KR")} (${dataPoint.changePercent}%)
          </div>
        </div>
      `;

      const tooltipWidth = tooltip.offsetWidth;
      const tooltipHeight = tooltip.offsetHeight;
      const chartRect = chartContainerRef.current?.getBoundingClientRect();

      if (chartRect) {
        let left = point.x + 10;
        let top = point.y - tooltipHeight / 2;

        if (left + tooltipWidth > chartRect.width) {
          left = point.x - tooltipWidth - 10;
        }
        if (top < 0) {
          top = 0;
        }
        if (top + tooltipHeight > chartRect.height) {
          top = chartRect.height - tooltipHeight;
        }

        Object.assign(tooltip.style, { left: `${left}px`, top: `${top}px` });
      }
    }
  }, [visible, data, colors, chartContainerRef]);

  return <div ref={tooltipRef} />;
};
