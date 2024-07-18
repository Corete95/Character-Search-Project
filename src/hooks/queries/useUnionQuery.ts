import { useSuspenseQuery } from "@tanstack/react-query";
import { errorStatus } from "../../utility/utils";
import api from "@/api/axios";
import axios from "axios";

export const fetchUnion: any = async (ocid: string) => {
  try {
    const data = await api.get(`user/union-raider?ocid=${ocid}`);
    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const code = errorStatus(error.response.data.error.name);
      throw new Error(code);
    }
  }
};

export const useUnionQuery = (ocid: string) => {
  const { data, isLoading, isError, error } = useSuspenseQuery({
    queryKey: ["uniont", ocid],
    queryFn: () => fetchUnion(ocid),
    retry: 0,
  });

  return { data, isLoading, isError, error };
};
