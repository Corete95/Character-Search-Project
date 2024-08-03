import { useQuery } from "@tanstack/react-query";
import { errorStatus } from "../../utility/utils";
import api from "@/api/axios";
import axios from "axios";

export const fetchGuildBasic: any = async (id: string) => {
  try {
    const data = await api.get(`guild/basic?oguild_id=${id}`);
    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const code = errorStatus(error.response.data.error.name);
      throw new Error(code);
    }
  }
};

export const fetchGuildId: any = async (name: string, world: string) => {
  try {
    const data = await api.get(
      `guild/id?guild_name=${name}&world_name=${world}`,
    );
    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const code = errorStatus(error.response.data.error.name);
      throw new Error(code);
    }
  }
};

export const useGuildBasicQuery = (name: string, world: string) => {
  const { data: id } = useQuery({
    queryKey: ["guild-id", name],
    queryFn: () => fetchGuildId(name, world),
    retry: 0,
  });

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["guildBasic", id?.oguild_id],
    queryFn: () => fetchGuildBasic(id?.oguild_id),
    enabled: !!id?.oguild_id,
  });

  return { data, isLoading, isError, error };
};
