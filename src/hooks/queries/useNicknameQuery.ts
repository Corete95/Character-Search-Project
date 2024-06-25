import { useSuspenseQueries } from "@tanstack/react-query";
import { errorStatus } from "../../utility/utils";
import api from "@/api/axios";
import axios from "axios";

export const fetchData = async (
  endpoint: string,
  ocid: string,
  date: string
) => {
  try {
    const { data } = await api.get(`${endpoint}?ocid=${ocid}&date=${date}`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const code = errorStatus(error.response.data.error.name);
      throw new Error(code);
    }
    throw error;
  }
};

export const useNicknameQuery = (ocid: string, date: string) => {
  const keys = [
    "basic",
    "hyper-stat",
    "stat",
    "ability",
    "popularity",
    "dojang",
    "union",
  ];
  const endpoints = keys.map((key) =>
    key === "union" ? "user/union" : `character/${key}`
  );

  const queryResults = useSuspenseQueries({
    queries: keys.map((key, index) => ({
      queryKey: [key, ocid],
      queryFn: () => fetchData(endpoints[index], ocid, date),
      enabled: !!ocid,
    })),
    combine: (results) => {
      const isPending = results.some((result) => result.isPending);
      const isError = results.some((result) => result.isError);
      const data = results.map((result) => result.data);

      const combinedData = {
        ...data[0],
        popularity: data[4]?.popularity,
        dojang_best_floor: data[5]?.dojang_best_floor,
        union_level: data[6]?.union_level,
      };

      return {
        data: [combinedData, ...data.slice(1, 4)],
        pending: isPending,
        error: isError,
      };
    },
  });

  const { data, pending, error } = queryResults;

  return {
    info: data[0],
    hyper: data[1],
    user: data[2],
    ability: data[3],
    pending,
    error,
  };
};
