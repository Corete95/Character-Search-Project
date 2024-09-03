"use client";
import React, { useEffect, useRef } from "react";
import { createChart, ColorType, CrosshairMode } from "lightweight-charts";
import { useTheme } from "next-themes";

interface Test1Props {
  data: Array<{ time: string; price: number }>;
}

const Test1: React.FC<Test1Props> = ({ data }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const toolTipRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (!data || data.length === 0 || !chartContainerRef.current) return;
    const isDarkMode = theme === "dark";
    const upColor = "#ef5350";
    const downColor = "#007bff";
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: {
          type: ColorType.Solid,
          color: isDarkMode ? "#272727" : "#f5f5f5",
        },
        textColor: isDarkMode ? "white" : "black",
      },
      grid: {
        vertLines: {
          color: isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
        },
        horzLines: {
          color: isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
        },
      },
      width: chartContainerRef.current.clientWidth,
      height: 400,
      rightPriceScale: {
        borderVisible: false,
        scaleMargins: {
          top: 0.3,
          bottom: 0.25,
        },
      },

      crosshair: {
        mode: CrosshairMode.Normal,
      },
    });

    const candleSeries = chart.addCandlestickSeries({
      upColor,
      downColor,
      borderVisible: false,
      wickUpColor: upColor,
      wickDownColor: downColor,
    });

    candleSeries.applyOptions({
      priceFormat: {
        type: "custom",
        formatter: (price: number) => `${price.toLocaleString("ko-KR")}원`,
      },
    });

    const newTransformedData = data.map((current, index, array) => {
      const open = index === 0 ? current.price : array[index - 1].price;
      const close = current.price;
      const high = Math.max(open, close);
      const low = Math.min(open, close);
      const prevDayHigh = index === 0 ? open : array[index - 1].price;
      const change = close - prevDayHigh;
      const changePercent = ((change / prevDayHigh) * 100).toFixed(2);
      return {
        time: current.time,
        open,
        high,
        low,
        close,
        prevDayHigh,
        change,
        changePercent,
      };
    });

    candleSeries.setData(newTransformedData);
    chart.timeScale().fitContent();
    const totalBars = newTransformedData.length;

    const visibleBars = 60;
    const firstVisibleBar = Math.max(0, totalBars - visibleBars);

    chart.timeScale().setVisibleLogicalRange({
      from: firstVisibleBar,
      to: totalBars - 1,
    });

    if (!toolTipRef.current) {
      const toolTip = document.createElement("div");
      toolTip.style.position = "absolute";
      toolTip.style.display = "none";
      toolTip.style.padding = "8px";
      toolTip.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.1)";
      toolTip.style.fontSize = "12px";
      toolTip.style.pointerEvents = "none";
      toolTip.style.zIndex = "1000";
      toolTip.style.backgroundColor = isDarkMode ? "#363636" : "#ffffff";
      toolTip.style.color = isDarkMode ? "#ffffff" : "#333333";
      toolTip.style.border = `1px solid ${isDarkMode ? "#555555" : "#dddddd"}`;
      toolTip.style.borderRadius = "4px";
      chartContainerRef.current.appendChild(toolTip);
      toolTipRef.current = toolTip;
    }

    chart.subscribeCrosshairMove((param) => {
      if (
        param.point === undefined ||
        !param.time ||
        param.point.x < 0 ||
        param.point.x > chartContainerRef.current!.clientWidth ||
        param.point.y < 0 ||
        param.point.y > chartContainerRef.current!.clientHeight
      ) {
        toolTipRef.current!.style.display = "none";
      } else {
        const dataPoint = newTransformedData.find((d) => d.time === param.time);

        if (dataPoint) {
          const changeColor = dataPoint.change >= 0 ? upColor : downColor;
          toolTipRef.current!.style.display = "block";
          toolTipRef.current!.innerHTML = `
            <div style="display:flex; flex-direction:column; justify-content:center; align-items:center; text-align:center;">
              <div style="font-size:16px">⏱️ ${dataPoint.time}</div>
              <hr/>
              <div style="font-weight:bold; font-size:16px">${dataPoint.high.toLocaleString("ko-KR")}원</div>
              <div style="color: ${changeColor}">
                ${dataPoint.change.toLocaleString("ko-KR")} (${dataPoint.changePercent}%)
              </div>
            </div>
          `;

          const tooltipWidth = toolTipRef.current!.offsetWidth;
          const tooltipHeight = toolTipRef.current!.offsetHeight;
          const chartRect = chartContainerRef.current!.getBoundingClientRect();

          let left = param.point.x + 10; // 마우스 커서 오른쪽에 10px 간격
          let top = param.point.y - tooltipHeight / 2; // 마우스 커서 중앙에 맞춤

          // 툴팁이 차트 오른쪽 경계를 벗어나지 않도록 조정
          if (left + tooltipWidth > chartRect.width) {
            left = param.point.x - tooltipWidth - 10; // 마우스 커서 왼쪽에 표시
          }

          // 툴팁이 차트 위쪽 경계를 벗어나지 않도록 조정
          if (top < 0) {
            top = 0;
          }

          // 툴팁이 차트 아래쪽 경계를 벗어나지 않도록 조정
          if (top + tooltipHeight > chartRect.height) {
            top = chartRect.height - tooltipHeight;
          }

          toolTipRef.current!.style.left = `${left}px`;
          toolTipRef.current!.style.top = `${top}px`;
        }
      }
    });

    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current!.clientWidth });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, [data, theme]);

  return <div ref={chartContainerRef} className="relative h-[400px] w-full" />;
};

export default Test1;
