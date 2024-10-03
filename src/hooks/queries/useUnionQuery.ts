import { useQueries } from "@tanstack/react-query";
import { errorStatus } from "../../utilitys/utils";
import api from "@/api/axios";
import axios from "axios";

export const fetchUnion: any = async (endpoint: string, ocid: string) => {
  try {
    const data = await api.get(`user/${endpoint}?ocid=${ocid}`);
    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const code = errorStatus(error.response.data.error.name);
      throw new Error(code);
    }
  }
};

export const useUnionQuery = (ocid: string) => {
  const keys = ["union-raider", "union-artifact", "union"];

  const queryResults: any = useQueries({
    queries: keys.map((key) => ({
      queryKey: [key, ocid],
      queryFn: () => fetchUnion(key, ocid),
      enabled: !!ocid,
    })),
    combine: (results) => {
      const data = results.map((result) => result.data);
      const isPending = results.some((result) => result.isPending);
      const isError = results.some((result) => result.isError);

      return {
        data,
        pending: isPending,
        error: isError,
      };
    },
  });

  const { data, pending, error } = queryResults;

  return {
    data,
    pending,
    error,
  };
};
