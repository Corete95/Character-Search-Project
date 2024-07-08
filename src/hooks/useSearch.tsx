"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export const useSearch = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>("")
  
  const changeSearchTerm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const submitSearchTerm = (
    e: React.FormEvent<HTMLFormElement>,
    routingPage: string
  ) => {
    e.preventDefault();
    if (searchTerm === "") return;

    const urlSearchQuery = encodeURI(searchTerm);
    setSearchTerm("");
    router.push(`/${routingPage}/${urlSearchQuery}`);
  };

  return {
    searchTerm,
    setSearchTerm,
    changeSearchTerm,
    submitSearchTerm,
  };
};
