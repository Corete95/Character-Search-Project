import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export const useSelectState = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pageParam = parseInt(searchParams.get("page") || "1", 10);

  const [state, setState] = useState({
    selectedJobValue: (searchParams.get("class") as string | null) || undefined,
    jobCategory: null as string | null,
    selectedWorldValue:
      (searchParams.get("world_name") as string | null) || undefined,
    worldCategory: null as string | null,
  });

  const updateURL = (newState: typeof state) => {
    const searchParams = new URLSearchParams({
      page: pageParam.toString(),
      ...(newState.selectedJobValue && { class: newState.selectedJobValue }),
      ...(newState.selectedWorldValue && {
        world_name: newState.selectedWorldValue,
      }),
      ...(newState.selectedWorldValue === "전체월드" && { world_type: "0" }),
      ...(newState.worldCategory === "리부트" &&
        newState.selectedWorldValue === "리부트 전체" && { world_type: "1" }),
    });

    router.push(`${pathname}?${searchParams.toString()}`);
  };

  const handleChange = (
    type: "job" | "world",
    value: string,
    category: string
  ) => {
    setState((prevState) => {
      const newState = {
        ...prevState,
        ...(type === "job"
          ? { selectedJobValue: value, jobCategory: category }
          : { selectedWorldValue: value, worldCategory: category }),
      };
      updateURL(newState);
      return newState;
    });
  };

  const isResetNeeded = (type: "job" | "world", currentCategory: string) => {
    return type === "job"
      ? state.jobCategory !== null && state.jobCategory !== currentCategory
      : state.worldCategory !== null && state.worldCategory !== currentCategory;
  };

  return {
    selectedJobValue: state.selectedJobValue,
    selectedWorldValue: state.selectedWorldValue,
    handleChange,
    isJobResetNeeded: (currentCategory: string) =>
      isResetNeeded("job", currentCategory),
    isWorldResetNeeded: (currentCategory: string) =>
      isResetNeeded("world", currentCategory),
  };
};
