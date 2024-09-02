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
        formatter: (price: number) => price.toLocaleString("ko-KR"),
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

    // 보여질 캔들의 개수를 50개로 설정하고, 최신 데이터부터 보여줍니다.
    const visibleBars = 60;
    const firstVisibleBar = Math.max(0, totalBars - visibleBars);

    chart.timeScale().setVisibleLogicalRange({
      from: firstVisibleBar,
      to: totalBars - 1, // 배열 인덱스는 0부터 시작하므로 1을 뺍니다.
    });
    // 툴팁 생성
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
          <div style="display:flex justify-content:center">
            <div style="font-size:18px">${dataPoint.time}</div>
            <div>고가: ${dataPoint.high.toLocaleString("ko-KR")}</div>
            <div style="color: ${changeColor}">
              전일 대비: ${dataPoint.change.toLocaleString("ko-KR")} (${dataPoint.changePercent}%)
            </div>
            </div>
          `;
          const chartRect = chartContainerRef.current!.getBoundingClientRect();
          const toolTipWidth = toolTipRef.current!.offsetWidth;
          const toolTipHeight = toolTipRef.current!.offsetHeight;

          let left = param.point.x + chartRect.left;
          let top = param.point.y + chartRect.top - toolTipHeight;

          // 툴팁이 차트 영역을 벗어나지 않도록 조정
          // if (left + toolTipWidth > chartRect.right) {
          //   left = chartRect.right - toolTipWidth;
          // }
          // if (top < chartRect.top) {
          //   top = param.point.y + chartRect.top + 10; // 포인터 아래로 이동
          // }

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
