import { useQueries } from "@tanstack/react-query";
import { errorStatus } from "../../utility/utils";
import axios from "axios";
import api from "../../api/axios";

export const fetchSkill = async (ocid: string, skill: string): Promise<any> => {
  try {
    const { data } = await api.get(
      skill === "link-skill"
        ? `character/${skill}?ocid=${ocid}`
        : `character/skill?ocid=${ocid}&character_skill_grade=${skill}`,
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const code = errorStatus(error.response.data.error.name);
      return { error: true, message: code };
    }
    return { error: true, message: "오류가 발생했습니다." };
  }
};

const conversion = (item: any) => {
  const ownedLinkData = item?.character_owned_link_skill;

  const newItem = { ...item };
  [
    "character_link_skill",
    "character_link_skill_preset_1",
    "character_link_skill_preset_2",
    "character_link_skill_preset_3",
  ].forEach((key) => {
    newItem[key] = [ownedLinkData, ...item[key]];
  });

  return newItem;
};

export const useSkillQuery = (ocid: string) => {
  const keys = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "hyperpassive",
    "hyperactive",
    "5",
    "6",
    "link-skill",
  ];

  const queryResults: any = useQueries({
    queries: keys.map((key) => ({
      queryKey: [key, ocid],
      queryFn: () => fetchSkill(ocid, key),
      enabled: !!ocid,
    })),
    combine: (results) => {
      const data = results.map((result) => result.data);
      const isPending = results.some((result) => result.isPending);
      const isError = results.some((result) => result.isError);

      const processedData = data.map((item, index) =>
        index === 9 ? conversion(item) : item,
      );

      return {
        data: processedData,
        pending: isPending,
        error: isError,
      };
    },
  });

  const { data, pending, error } = queryResults;
  return { skill: data.slice(0, 9), link: data[9], pending, error };
};
