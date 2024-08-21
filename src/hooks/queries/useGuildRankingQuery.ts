// import { useQuery } from "@tanstack/react-query";
// import { errorStatus } from "../../utility/utils";
// import api from "@/api/axios";
// import axios from "axios";

// export const fetchGuildRanking: any = async (date: string, name: string) => {
//   try {
//     const data = await api.get(
//       `ranking/guild?date=${date}&ranking_type=0&guild_name=${name}`,
//     );
//     return data.data;
//   } catch (error) {
//     if (axios.isAxiosError(error) && error.response) {
//       const code = errorStatus(error.response.data.error.name);
//       throw new Error(code);
//     }
//   }
// };

// export const useGuildRankingQuery = (date: string, name: string) => {
//   const { data, isLoading, isError, error } = useQuery({
//     queryKey: ["guildRanking", name],
//     queryFn: () => fetchGuildRanking(date, name),
//     retry: 0,
//   });

//   return { data, isLoading, isError, error };
// };
import { useQuery } from "@tanstack/react-query";
import { errorStatus } from "../../utility/utils";
import api from "@/api/axios";
import axios from "axios";

const fetchOGuildId = async (guildName: string, worldName: string) => {
  try {
    const response = await api.get(
      `guild/id?guild_name=${guildName}&world_name=${worldName}`,
    );
    return response.data.oguild_id;
  } catch (error) {
    console.error("Error fetching oguild_id:", error);
    throw error;
  }
};

const fetchGuildMemberCount = async (oGuildId: string) => {
  try {
    const response = await api.get(`guild/basic?oguild_id=${oGuildId}`);
    return response.data.guild_member_count;
  } catch (error) {
    console.error("Error fetching guild member count:", error);
    throw error;
  }
};

export const fetchGuildRanking: any = async (date: string, name: string) => {
  try {
    const data = await api.get(
      `ranking/guild?date=${date}&ranking_type=0&guild_name=${name}`,
    );

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
    if (axios.isAxiosError(error) && error.response) {
      const code = errorStatus(error.response.data.error.name);
      throw new Error(code);
    }
  }
};

export const useGuildRankingQuery = (date: string, name: string) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["guildRanking", name, date],
    queryFn: () => fetchGuildRanking(date, name),
    retry: 0,
  });

  return { data, isLoading, isError, error };
};
