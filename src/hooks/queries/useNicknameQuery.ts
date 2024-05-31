import { useSuspenseQueries } from "@tanstack/react-query";
import { errorStatus } from "../../utility/utils";
import api from "@/api/axios";
import axios from "axios";

const fetchNickname = async (get: string, ocid: string, date: string) => {
  try {
    const data = await api.get(`character/${get}?ocid=${ocid}&date=${date}`);
    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const code = errorStatus(error.response.data.error.name);
      throw new Error(code);
    }
  }
};

export const useNicknameQuery = (ocid: string, date: string) => {
  const key = ["basic", "hyper-stat", "stat", "ability"];

  const queryResults = useSuspenseQueries({
    queries: key.map((id) => ({
      queryKey: [id, ocid],
      queryFn: () => fetchNickname(id, ocid, date),
      enabled: !!ocid,
    })),
    combine: (results) => {
      return {
        data: results.map((result) => result.data),
        pending: results.some((result) => result.isPending),
        error: results.some((result) => result.isError),
      };
    },
  });

  return {
    info: queryResults.data[0],
    hyper: queryResults.data[1],
    user: queryResults.data[2],
    ability: queryResults.data[3],
    pending: queryResults.pending,
  };
};
