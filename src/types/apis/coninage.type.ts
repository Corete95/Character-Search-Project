export interface PriceDataType {
  id: number;
  time: string;
  price: number;
}

export interface CandlestickDataType {
  x: string;
  y: [number, number, number, number];
}
