import { useQuery } from "@tanstack/react-query";
import api from "@/api/axios";
import { handleAxiosError } from "@/lib/utils";
import { notFound } from "next/navigation";

const fetchOGuildId = async (guildName: string, worldName: string) => {
  try {
    const response = await api.get(
      `guild/id?guild_name=${guildName}&world_name=${worldName}`,
    );
    return response.data.oguild_id;
  } catch (error) {
    handleAxiosError(error);
  }
};

const fetchGuildMemberCount = async (oGuildId: string) => {
  try {
    const response = await api.get(`guild/basic?oguild_id=${oGuildId}`);
    return response.data.guild_member_count;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const fetchGuildRanking: any = async (date: string, name: string) => {
  try {
    const data = await api.get(
      `ranking/guild?date=${date}&ranking_type=0&guild_name=${name}`,
    );

    if (!data.data || !data.data.ranking || data.data.ranking.length === 0) {
      return null;
    }
    const enhancedRanking = await Promise.all(
      data.data.ranking.map(async (guild: any) => {
        const oGuildId = await fetchOGuildId(
          guild.guild_name,
          guild.world_name,
        );

        const memberCount = await fetchGuildMemberCount(oGuildId);
        return { ...guild, guild_member_count: memberCount };
      }),
    );

    return { ...data.data, ranking: enhancedRanking };
  } catch (error) {
    handleAxiosError(error);
  }
};

export const useGuildRankingQuery = (date: string, name: string) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["guildRanking", name, date],
    queryFn: () => fetchGuildRanking(date, name),
    retry: 0,
  });

  if (!isLoading && !data) {
    notFound();
  }
  return { data, isLoading, isError, error };
};
