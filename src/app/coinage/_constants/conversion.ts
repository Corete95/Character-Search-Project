import {
  CandlestickDataType,
  PriceDataType,
  FormattedPriceDataType,
} from "@/types/apis/coninage.type";

export const calculatePriceChanges = (
  data: PriceDataType[]
): FormattedPriceDataType[] => {
  const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];

  return data
    .map((item, index, array) => {
      const date = new Date(item.time);
      const dayName = daysOfWeek[date.getDay()];
      const formattedDate = `${item.time} (${dayName})`;

      if (index === 0) {
        return {
          key: index,
          date: formattedDate,
          price: item.price,
          price_change: 0,
          percentage_change: 0.0,
        };
      }

      const previousPrice = array[index - 1].price;
      const priceChange = item.price - previousPrice;
      const percentageChange = ((priceChange / previousPrice) * 100).toFixed(2);

      return {
        key: index,
        date: formattedDate,
        price: item.price,
        price_change: (priceChange > 0 ? "+" : "") + priceChange,
        percentage_change:
          (parseFloat(percentageChange) > 0 ? "+" : "") + percentageChange,
      };
    })
    .reverse();
};

export const conversion = (data: PriceDataType[]): CandlestickDataType[] => {
  return data?.map((current, index) => {
    const open = index === 0 ? current.price : data[index - 1].price;
    const close = current.price;
    const high =
      index === 0
        ? current.price
        : Math.max(data[index - 1].price, current.price);
    const low =
      index === 0
        ? current.price
        : Math.min(data[index - 1].price, current.price);

    return {
      x: current.time,
      y: [open, high, low, close],
    };
  });
};

const formatNumberWithCommas = (number: number) =>
  number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export const calculatePriceChangePercentage = (
  data: FormattedPriceDataType[]
) => {
  const startPrice = data.at(-1).price;
  const endPrice = data[0].price;
  const priceDifference = endPrice - startPrice;
  const percentageIncrease = (priceDifference / startPrice) * 100;

  const sign = priceDifference > 0 ? "+" : "";
  return {
    priceDifference: `${sign}${formatNumberWithCommas(priceDifference)}`,
    percentageIncrease: `${sign}${percentageIncrease.toFixed(2)}`,
  };
};
