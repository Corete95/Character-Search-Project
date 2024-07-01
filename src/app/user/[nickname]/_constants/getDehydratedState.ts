import { fetchItem } from "@/hooks/queries/useItemQuery";
import { fetchData } from "@/hooks/queries/useNicknameQuery";
import { fetchOcid } from "@/hooks/queries/useOcidQuery";
import { QueryClient, DehydratedState, dehydrate } from "@tanstack/react-query";

const USER_KEYS = [
  "basic",
  "hyper-stat",
  "stat",
  "ability",
  "popularity",
  "dojang",
  "union",
];
const ITEM_KEYS = [
  "item-equipment",
  "android-equipment",
  "symbol-equipment",
  "set-effect",
];
const ENDPOINTS = USER_KEYS.map((key) =>
  key === "union" ? "user/union" : `character/${key}`
);

const isErrorResult = (
  result: any
): result is { error: boolean; message: string } => {
  return result && result.error === true && typeof result.message === "string";
};

export const getDehydratedState = async (
  nickname: string,
  date: string
): Promise<DehydratedState | { error: boolean; message: string }> => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["user", nickname],
    queryFn: () => fetchOcid(nickname),
  });
  const ocidData = queryClient.getQueryData<{ ocid: string }>([
    "user",
    nickname,
  ]);

  if (!ocidData || !ocidData.ocid) {
    return {
      error: true,
      message:
        "캐릭터를 찾을 수 없습니다. 2023년 12월 21일 이후 접속 기록이 있어야 조회 가능합니다.",
    };
  }

  const userQueries = USER_KEYS.map((key, index) =>
    queryClient.prefetchQuery({
      queryKey: [key, ocidData.ocid],
      queryFn: () => fetchData(ENDPOINTS[index], ocidData.ocid, date),
    })
  );

  const itemQueries = ITEM_KEYS.map((key) =>
    queryClient.prefetchQuery({
      queryKey: [key, ocidData.ocid],
      queryFn: () => fetchItem(key, ocidData.ocid, date),
    })
  );

  await Promise.all([...userQueries, ...itemQueries]);

  const results = [...USER_KEYS, ...ITEM_KEYS].map((key) =>
    queryClient.getQueryData([key, ocidData.ocid])
  );

  const errorResult = results.find(isErrorResult);

  if (errorResult) {
    return { error: true, message: errorResult.message };
  }

  return dehydrate(queryClient);
};
