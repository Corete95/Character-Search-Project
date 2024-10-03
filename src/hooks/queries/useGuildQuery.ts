import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import api from "../../api/axios";

import { errorStatus } from "../../utilitys/utils";

export const fetchGuild = async (params: Record<string, string | number>) => {
  try {
    const searchParams = new URLSearchParams();

    Object.keys(params).forEach((key) => {
      if (params[key]) {
        searchParams.append(key, String(params[key]));
      }
    });

    const response = await api.get(`ranking/guild?${searchParams.toString()}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const code = errorStatus(error.response.data.error.name);
      throw new Error(code);
    }
    throw error;
  }
};

const conversion = (data: any) => {
  return data.map((item: any) => ({
    ...item,
    key: item.ranking,
  }));
};

export const useGuildQuery = (params: Record<string, string | number>) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["guild", params],
    queryFn: () => fetchGuild(params),
    select: (guild) => conversion(guild.ranking),
    retry: false,
  });

  return { data, isLoading, isError };
};
