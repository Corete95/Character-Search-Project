import { useSuspenseQuery } from "@tanstack/react-query";
import axios from "axios";
import api from "../../api/axios";
import { RankingListType } from "@/types/apis/rank.type";
import { errorStatus } from "../../../utility/utils";

const fetchRanking = async (date: string, page: number, job: string) => {
  try {
    // const data = await api.get(
    //   `ranking/overall?date=${date}&page=${page}&class=${job}`
    // );
    // return data.data;
    const params = new URLSearchParams({
      date,
      page: page.toString(),
      ...(job && { class: job }),
    });
    const data = await api.get(`ranking/overall?${params.toString()}`);
    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const code = errorStatus(error.response.data.error.name);
      throw new Error(code);
    }
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

export const useRankingQuery = (date: string, page: number, job: string) => {
  const { data, isLoading, isError, error } = useSuspenseQuery({
    queryKey: ["rank", { date, page, job }],
    queryFn: () => fetchRanking(date, page, job),
    retry: 0,
    select: (rank) => conversion(rank.ranking),
  });

  return { data, isLoading, isError };
};
