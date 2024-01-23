"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const useSearch = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>(
    router ? router.toString() : ""
  );
  console.log("??", router);
  const changeSearchTerm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const submitSearchTerm = (routingPage: string) => {};

  return {
    searchTerm,
    setSearchTerm,
    changeSearchTerm,
    submitSearchTerm,
  };
};
