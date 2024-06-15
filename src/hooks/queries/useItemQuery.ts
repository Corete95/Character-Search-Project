import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import api from "../../api/axios";

import { errorStatus } from "../../utility/utils";

const fetchItem = async (ocid: string, day: string) => {
  try {
    const { data } = await api.get(
      `character/item-equipment?ocid=${ocid}&date=${day}`
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const code = errorStatus(error.response.data.error.name);
      throw new Error(code);
    }
    throw error;
  }
};

export const useItemQuery = (ocid: string, day: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["item", ocid],
    queryFn: () => fetchItem(ocid, day),

    retry: false,
  });

  return { data, isLoading, isError };
};
