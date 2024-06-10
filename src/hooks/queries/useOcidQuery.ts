import { useSuspenseQuery } from "@tanstack/react-query";
import { errorStatus } from "../../utility/utils";
import api from "@/api/axios";
import axios from "axios";

export const fetchOcid = async (name: string) => {
  try {
    const data = await api.get(`id?character_name=${name}`);
    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const code = errorStatus(error.response.data.error.name);
      throw new Error(code);
    }
  }
};

export const useOcidQuery = (name: string) => {
  const { data, isLoading, isError, error } = useSuspenseQuery({
    queryKey: ["user", name],
    queryFn: () => fetchOcid(name),
    retry: 0,
  });

  return { data, isLoading, isError, error };
};
