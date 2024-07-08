import { atom } from "recoil";

const localStorageData =
  typeof window !== "undefined" &&
  JSON.parse(localStorage.getItem("search") || "[]");

export const recentSearchState = atom<any[]>({
  key: "recentSearchState",
  default: localStorageData,
});
