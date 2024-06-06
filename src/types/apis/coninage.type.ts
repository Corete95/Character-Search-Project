export interface PriceDataType {
  id: number;
  time: string;
  price: number;
}

export interface CandlestickDataType {
  x: string;
  y: [number, number, number, number];
}

export interface FormattedPriceDataType {
  key: number;
  date: string;
  price: number;
  price_change: string | number;
  percentage_change: string | number;
}

export interface CoinDataType {
  id: number;
  time: string;
  price: number;
}
