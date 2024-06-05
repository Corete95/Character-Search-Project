import dayjs from "dayjs";
import { ApexOptions } from "apexcharts";

export const getChartOptions = (
  theme: "light" | "dark",
  data: any[],
  chartRef: React.MutableRefObject<ApexCharts | null>
): ApexOptions => ({
  theme: {
    mode: theme,
  },
  chart: {
    type: "candlestick",
    height: 400,
    toolbar: { show: false },
    zoom: {
      enabled: true,
      type: "xy",
    },
    events: {
      mounted: (chart) => {
        chartRef.current = chart;
      },
    },
  },
  xaxis: {
    type: "datetime",
    axisTicks: { show: false },
    tickAmount: Math.ceil(data?.length / 7),
    labels: {
      formatter: (val) => dayjs(val).format("MM-DD"),
    },
    tooltip: {
      enabled: false,
    },
  },
  yaxis: {
    tooltip: {
      enabled: true,
      offsetX: -100,
    },
    labels: {
      formatter: (val) =>
        `${val.toLocaleString("ko-KR", {
          style: "currency",
          currency: "KRW",
        })} 메소`,
    },
  },
  plotOptions: {
    candlestick: {
      colors: {
        upward: "#dc3545",
        downward: "#007bff",
      },
      wick: {
        useFillColor: true,
      },
    },
    bar: {
      columnWidth: "80%",
    },
  },
  tooltip: {
    enabled: true,
    custom: ({ series, seriesIndex, dataPointIndex, w }) => {
      const xValue = w.globals.seriesX[seriesIndex][dataPointIndex];
      const h = w.globals.seriesCandleH[seriesIndex][dataPointIndex];

      return `
        <div class="apexcharts-tooltip-candlestick">
        <div>날짜: ${new Date(xValue).toLocaleDateString()}</div>  
          <div>가격: ${h.toLocaleString("ko-KR")} 메소</div>  
        </div>
      `;
    },
  },
});
