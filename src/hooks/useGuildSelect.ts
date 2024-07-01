import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export const useGuildSelectState = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pageParam = parseInt(searchParams.get("page") || "1");

  const [state, setState] = useState({
    selectedWorldValue:
      (searchParams.get("world_name") as string | null) || null,
    selectedRankingType: (searchParams.get("ranking_type") as string) || "0",
  });

  const updateURL = (newState: typeof state) => {
    const searchParams = new URLSearchParams({
      page: pageParam.toString(),
      ...(newState.selectedWorldValue && {
        world_name: newState.selectedWorldValue,
      }),
      ...(newState.selectedRankingType && {
        ranking_type: newState.selectedRankingType,
      }),
    });

    router.push(`${pathname}?${searchParams.toString()}`);
  };

  const handleChange = (type: "world" | "ranking", value: string) => {
    setState((prevState) => {
      const newState = {
        ...prevState,
        ...(type === "world"
          ? { selectedWorldValue: value }
          : { selectedRankingType: value }),
      };
      updateURL(newState);
      return newState;
    });
  };

  return {
    selectedWorldValue: state.selectedWorldValue,
    selectedRankingType: state.selectedRankingType,
    handleChange,
  };
};
