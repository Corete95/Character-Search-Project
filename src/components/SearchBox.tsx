"use client";

import { useSearch } from "@/hooks/useSearch";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";

const SearchBox = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const { searchTerm, setSearchTerm, changeSearchTerm, submitSearchTerm } =
    useSearch();

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const urlSearchQuery = encodeURI(searchQuery);
    console.log(urlSearchQuery, searchQuery);
    router.push(searchQuery);
  };
  return (
    <div className="w-[600px] mobile:w-full">
      <form
        className="flex items-center p-4 bg-white rounded dark:bg-dark"
        onSubmit={onSearch}
      >
        <input
          className="w-full h-[40px] p-1 border-white outline-none text-lg dark:bg-dark"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button>
          <CiSearch size={28} />
        </button>
      </form>
    </div>
  );
};

export default SearchBox;
