import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { errorStatus } from "../../utility/utils";
import { CandlestickDataType, PriceDataType } from "@/types/apis/coninage.type";

const fetchCoinage = async (): Promise<PriceDataType[]> => {
  const { data, error } = await supabase.from("coinage").select("*");
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

const conversion = (data: PriceDataType[]): CandlestickDataType[] => {
  return data.map((current, index) => {
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

export const useCoinageQuery = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["coin"],
    queryFn: fetchCoinage,
    // select: conversion,
  });

  return { data, isLoading, isError };
};
