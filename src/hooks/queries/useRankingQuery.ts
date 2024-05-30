import { useSuspenseQuery } from "@tanstack/react-query";
import axios from "axios";
import api from "../../api/axios";
import { RankingListType } from "@/types/apis/rank.type";
import { errorStatus } from "../../../utility/utils";

const fetchRanking = async (params: Record<string, string | number>) => {
  try {
    const searchParams = new URLSearchParams();

    Object.keys(params).forEach((key) => {
      if (params[key]) {
        searchParams.append(key, String(params[key]));
      }
    });

    const response = await api.get(
      `ranking/overall?${searchParams.toString()}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const code = errorStatus(error.response.data.error.name);
      throw new Error(code);
    }
    throw error;
  }
};

const conversion = (data: RankingListType[]) => {
  return data.map((item) => ({
    ...item,
    key: item.ranking,
    sub_class_name:
      item.sub_class_name === "" ? item.class_name : item.sub_class_name,
  }));
};

export const useRankingQuery = (params: Record<string, string | number>) => {
  const { data, isLoading, isError } = useSuspenseQuery({
    queryKey: ["rank", params],
    queryFn: () => fetchRanking(params),
    retry: 0,
    select: (rank) => conversion(rank.ranking),
  });

  return { data, isLoading, isError };
};
