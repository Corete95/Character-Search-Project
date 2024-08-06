import { useQuery } from "@tanstack/react-query";
import api from "@/api/axios";
import { handleAxiosError } from "@/lib/utils";

export const fetchGuildBasic = async (id: string) => {
  try {
    const data = await api.get(`guild/basic?oguild_id=${id}`);
    return data.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const fetchGuildId = async (name: string, world: string) => {
  try {
    const data = await api.get(
      `guild/id?guild_name=${name}&world_name=${world}`,
    );
    return data.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const fetchGuildRanking = async (
  date: string,
  name: string,
  world: string,
  rankingTypes: number[],
) => {
  try {
    const requests = rankingTypes.map((type) =>
      api.get(
        `ranking/guild?date=${date}&guild_name=${name}&world_name=${world}&ranking_type=${type}`,
      ),
    );
    const responses = await Promise.all(requests);
    return responses.map((response) => response.data.ranking[0]);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const useGuildBasicQuery = (
  date: string,
  name: string,
  world: string,
) => {
  const { data: id } = useQuery({
    queryKey: ["guild-id", name],
    queryFn: () => fetchGuildId(name, world),
    retry: 0,
  });

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["guild-basic", id?.oguild_id],
    queryFn: () => fetchGuildBasic(id?.oguild_id),
    enabled: !!id?.oguild_id,
  });

  const { data: rankings } = useQuery({
    queryKey: ["guild-ranking", id?.oguild_id],
    queryFn: () => fetchGuildRanking(date, name, world, [0, 2]),
    enabled: !!id?.oguild_id,
  });

  const mergedData =
    data && rankings
      ? [
          { title: "길드마스터", content: data.guild_master_name },
          { title: "명성치 월드 랭킹", content: `${rankings[0].ranking} 위` },
          { title: "지하수로 월드 랭킹", content: `${rankings[1].ranking} 위` },
          { title: "길드원 수 ", content: `${data.guild_member_count} 명` },
          {
            title: "길드 포인트 ",
            content: `명성치 : ${rankings[0].guild_point.toLocaleString()}점 / 지하수로: ${rankings[1].guild_point.toLocaleString()}점`,
          },
        ]
      : data;

  return { data, guildData: mergedData, isLoading, isError, error };
};
