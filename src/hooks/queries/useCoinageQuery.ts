import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { PriceDataType } from "@/types/apis/coninage.type";

const fetchCoinage = async (): Promise<PriceDataType[]> => {
  const { data, error } = await supabase.from("coinage").select("*");
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const useCoinageQuery = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["coin"],
    queryFn: fetchCoinage,
  });

  return { data, isLoading, isError };
};
