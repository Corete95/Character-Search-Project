"use client";

import WorldCommonSelect from "@/components/WorldCommonSelect";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { SERVERLIST } from "../[name]/_constants/constants";

const GuildSearch = () => {
  const router = useRouter();
  const [selectWorld, setSelectWorld] = useState("전체월드");
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectWorld === "전체월드") {
      return router.push(`/guild/${value}`);
    }
    router.push(`/guild/${value}/${selectWorld}`);
  };

  return (
    <div className="py-5">
      <h1 className="text-gray-900 mb-8 text-center text-3xl font-bold">
        <span className="text-orange-500">길드</span> 검색
      </h1>
      <div className="mb-6">
        <form className="relative" onSubmit={handleSubmit}>
          <WorldCommonSelect
            label={"월드"}
            placeholder="선택"
            items={SERVERLIST}
            selectedKey={selectWorld}
            styles="absolute top-1/2 -translate-y-1/2 focus:outline-none !max-w-32 h-56px "
            transparent={true}
            onChange={(value) => setSelectWorld(value)}
          />
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="길드 이름을 입력해주세요."
            className="text-gray-900 w-full rounded-lg bg-white py-3 pl-32 pr-12 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 dark:text-black"
          />
          <button className="text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 hover:text-orange-500 dark:text-black">
            <IoIosSearch size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default GuildSearch;
