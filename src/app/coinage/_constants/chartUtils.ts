import { IChartApi, CandlestickData } from "lightweight-charts";

export const transformData = (
  data: Array<{ time: string; price: number }>,
): CandlestickData[] => {
  return data.map((current, index, array) => {
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
};

export const setupCrosshairMove = (
  chart: IChartApi,
  data: CandlestickData[],
  tooltip: HTMLDivElement,
  chartContainer: HTMLDivElement,
  colors: { upColor: string; downColor: string },
) => {
  chart.subscribeCrosshairMove((param) => {
    if (
      param.point === undefined ||
      !param.time ||
      param.point.x < 0 ||
      param.point.x > chartContainer.clientWidth ||
      param.point.y < 0 ||
      param.point.y > chartContainer.clientHeight
    ) {
      tooltip.style.display = "none";
    } else {
      const dataPoint = data.find((d) => d.time === param.time);
      if (dataPoint) {
        updateTooltip(dataPoint, param.point, tooltip, chartContainer, colors);
      }
    }
  });
};

const updateTooltip = (
  dataPoint: any,
  point: { x: number; y: number },
  tooltip: HTMLDivElement,
  chartContainer: HTMLDivElement,
  colors: { upColor: string; downColor: string },
) => {
  const changeColor = dataPoint.change >= 0 ? colors.upColor : colors.downColor;
  tooltip.style.display = "block";
  tooltip.innerHTML = `
    <div style="display:flex; flex-direction:column; justify-content:center; align-items:center; text-align:center;">
      <div style="font-size:16px">⏱️ ${dataPoint.time}</div>
      <hr/>
      <div style="font-weight:bold; font-size:16px">${dataPoint.high.toLocaleString("ko-KR")}원</div>
      <div style="color: ${changeColor}">
        ${dataPoint.change.toLocaleString("ko-KR")} (${dataPoint.changePercent}%)
      </div>
    </div>
  `;

  const tooltipWidth = tooltip.offsetWidth;
  const tooltipHeight = tooltip.offsetHeight;
  const chartRect = chartContainer.getBoundingClientRect();

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
};
