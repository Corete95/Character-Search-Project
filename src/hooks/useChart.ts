import { useEffect, useRef, useMemo, useState } from "react";
import {
  createChart,
  ColorType,
  CrosshairMode,
  IChartApi,
  ISeriesApi,
} from "lightweight-charts";
import { useTheme } from "next-themes";
import { transformData } from "@/app/coinage/_constants/chartUtils";

export const useChart = (data: Array<{ time: string; price: number }>) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const candleSeriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipData, setTooltipData] = useState<{
    dataPoint: any;
    point: { x: number; y: number };
  } | null>(null);
  const { theme } = useTheme();

  const isDarkMode = theme === "dark";
  const colors = useMemo(
    () => ({
      upColor: "#ef5350",
      downColor: "#007bff",
      background: isDarkMode ? "#272727" : "#f5f5f5",
      textColor: isDarkMode ? "white" : "black",
      gridColor: isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
      tooltipBackground: isDarkMode ? "#363636" : "#ffffff",
      tooltipTextColor: isDarkMode ? "#ffffff" : "#333333",
      tooltipBorder: isDarkMode ? "#555555" : "#dddddd",
    }),
    [isDarkMode],
  );

  const transformedData = useMemo(() => transformData(data), [data]);

  useEffect(() => {
    if (!data.length || !chartContainerRef.current) return;

    const handleResize = () => {
      if (chartRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current!.clientWidth,
        });
      }
    };

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: colors.background },
        textColor: colors.textColor,
      },
      grid: {
        vertLines: { color: colors.gridColor },
        horzLines: { color: colors.gridColor },
      },
      width: chartContainerRef.current.clientWidth,
      height: 400,
      rightPriceScale: {
        borderVisible: false,
        scaleMargins: { top: 0.3, bottom: 0.25 },
        visible: true,
        borderColor: "rgba(197, 203, 206, 0.8)",
        entireTextOnly: true,
      },
      crosshair: {
        mode: CrosshairMode.Normal,
        vertLine: {
          labelVisible: false,
        },
        horzLine: {
          visible: true,
          labelVisible: false,
        },
      },
    });

    chartRef.current = chart;

    const candleSeries = chart.addCandlestickSeries({
      upColor: colors.upColor,
      downColor: colors.downColor,
      borderVisible: false,
      wickUpColor: colors.upColor,
      wickDownColor: colors.downColor,
    });

    candleSeriesRef.current = candleSeries;

    candleSeries.applyOptions({
      priceFormat: {
        type: "custom",
        formatter: (price: number) => `${price.toLocaleString("ko-KR")}원`,
      },
    });

    candleSeries.setData(transformedData);
    chart.timeScale().fitContent();

    const totalBars = transformedData.length;
    const visibleBars = 60;
    const firstVisibleBar = Math.max(0, totalBars - visibleBars);

    chart.timeScale().setVisibleLogicalRange({
      from: firstVisibleBar,
      to: totalBars - 1,
    });

    chart.subscribeCrosshairMove((param) => {
      if (
        param.point === undefined ||
        !param.time ||
        param.point.x < 0 ||
        param.point.x > chartContainerRef.current!.clientWidth ||
        param.point.y < 0 ||
        param.point.y > chartContainerRef.current!.clientHeight
      ) {
        setTooltipVisible(false);
      } else {
        const dataPoint = transformedData.find((d) => d.time === param.time);
        if (dataPoint) {
          setTooltipData({ dataPoint, point: param.point });
          setTooltipVisible(true);
        }
      }
    });

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, [data, colors, transformedData]);

  return { chartContainerRef, colors, tooltipVisible, tooltipData };
};
