import { useQueries } from "@tanstack/react-query";
import axios from "axios";
import api from "../../api/axios";
import { RankingListType } from "@/types/apis/rank.type";
import { errorStatus } from "../../utilitys/utils";

export const fetchMainRanking = async (
  params: Record<string, string | number>,
) => {
  try {
    const response = await api.get("ranking/overall", {
      params,
    });

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
  return data.slice(0, 10).map((item) => ({
    ...item,
    key: item.ranking,
    sub_class_name:
      item.sub_class_name === "" ? item.class_name : item.sub_class_name,
  }));
};

export const useMainRankingQuery = (
  params: Record<string, string | number>,
) => {
  const queryResult = useQueries({
    queries: [0, 1].map((key) => ({
      queryKey: ["mainRanking", key],
      queryFn: () => fetchMainRanking({ ...params, world_type: key }),
      select: (rank: any) => conversion(rank.ranking),
    })),
    combine: (results) => {
      const pending = results.some((result) => result.isPending);
      const error = results.some((result) => result.isError);
      const data = results.map((result) => result.data);

      return {
        data,
        pending,
        error,
      };
    },
  });

  const { data, pending, error } = queryResult;

  return {
    overall: data[0],
    reboot: data[1],
    pending,
    error,
  };
};
