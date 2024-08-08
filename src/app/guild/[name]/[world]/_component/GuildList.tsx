import React, { useMemo, useState } from "react";
import useFetchData from "@/hooks/useFetchData";
import Link from "next/link";
import Image from "next/image";
import { SortFunctionsType } from "@/types/apis/guild.type";
import { CiSearch } from "react-icons/ci";
import { Spinner } from "@nextui-org/react";
interface Props {
  list: string[];
  master: string;
}

const GuildList = ({ list, master }: Props) => {
  const { data, isLoading, isError } = useFetchData(
    list,
    master,
    "/api/guild-data",
  );
  const [filterState, setFilterState] = useState("레벨순");
  const [searchTerm, setSearchTerm] = useState("");

  const sortFunctions: SortFunctionsType = useMemo(
    () => ({
      레벨순: (a, b) => b.character_level - a.character_level,
      이름순: (a, b) => a.character_name.localeCompare(b.character_name),
      직업순: (a, b) => a.character_class.localeCompare(b.character_class),
    }),
    [],
  );

  const sortedCharacters = useMemo(() => {
    if (!data) return [];
    return [...data].sort(sortFunctions[filterState]);
  }, [data, filterState, sortFunctions]);

  const filteredCharacters = useMemo(() => {
    if (!searchTerm) return sortedCharacters;
    return sortedCharacters.filter((item) =>
      item.character_name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [sortedCharacters, searchTerm]);

  if (isLoading)
    return (
      <div className="flexCenter mx-auto mt-4 max-w-1200 dark:text-white">
        <Spinner label="길드원 목록을 불러오고있습니다." color="warning" />
      </div>
    );

  if (isError)
    return (
      <div className="flexCenter mx-auto mt-4 max-w-1200 dark:text-white">
        오류입니다. 새로고침을 해주세요.
      </div>
    );



  return (
    <div className="-ml-3 p-4">
      <section className="userContainer ml-3 mt-3">
        <p className="flex h-35px items-center px-3 text-sm">길드원 정렬</p>
        <hr className="border-zinc-300 dark:border-zinc-600" />
        <div className="flex justify-between mobile:flex-col">
          <div className="flex gap-2 p-2 dark:border-zinc-600 mobile:border-b mobile:border-b-zinc-300">
            {["레벨순", "이름순", "직업순"].map((category) => (
              <div
                key={category}
                className={`cursor-pointer rounded-3xl p-2 text-xs font-bold ${
                  filterState === category
                    ? "bg-zinc-500 text-white"
                    : "bg-zinc-200 dark:text-zinc-400"
                }`}
                onClick={() => setFilterState(category)}
              >
                {category}
              </div>
            ))}
          </div>
          <div className="mr-6 flex items-center mobile:my-3 mobile:w-full mobile:px-5">
            <div className="flex w-full items-center border border-[#0000002e] bg-modeWhite px-3 dark:bg-dark_gray">
              <input
                className="h-30px w-full bg-modeWhite p-2 px-3 py-1 text-sm outline-none dark:bg-dark_gray"
                placeholder="캐릭터 검색"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="cursor-pointer">
                <CiSearch size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>
      <div className="flex flex-wrap">
        {filteredCharacters.map((item, index) => {
          const isMaster = item.character_name === master;
          return (
            <div
              className={`w-full pl-3 pt-3 tablet:w-1/2 desktop:w-1/4 ${isMaster ? "order-first" : ""}`}
              key={`${item.character_name}-${index}`}
            >
              <Link href={`/user/${item.character_name}`}>
                <div
                  className={`relative rounded-lg ${
                    isMaster
                      ? "border-yellow-400 bg-gradient-to-br from-yellow-50 to-white dark:border-yellow-600 dark:from-yellow-900 dark:to-[#323941]"
                      : "dark:border-gray-700 border-userBorder bg-white_gray_100 dark:bg-[#323941]"
                  } p-2 shadow-md transition-transform duration-300 hover:scale-105 dark:shadow-lg`}
                >
                  {isMaster && (
                    <div className="absolute -right-2 -top-2 rounded-full bg-yellow-400 px-2 py-1 text-xs font-bold text-white shadow-lg">
                      마스터
                    </div>
                  )}
                  <div className="flex">
                    <div className="relative">
                      <Image
                        src={item.character_image}
                        alt={item.character_name}
                        width={96}
                        height={96}
                        priority
                        unoptimized
                        className="rounded-md"
                      />
                      {isMaster && (
                        <div className="absolute -bottom-2 -right-2 rounded-full bg-yellow-400 p-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-white"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zm7-10a1 1 0 01.707.293l.707.707.707-.707A1 1 0 0115 2h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-.707-.293L14 5.414l-.707.707A1 1 0 0112 7h-2a1 1 0 01-1-1V4a1 1 0 011-1h2zm0 10a1 1 0 01.707.293l.707.707.707-.707A1 1 0 0115 12h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-.707-.293L14 15.414l-.707.707A1 1 0 0112 17h-2a1 1 0 01-1-1v-2a1 1 0 011-1h2z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="ml-2 flex flex-col justify-center text-sm">
                      <div className="flex items-center">
                        <div className="relative mr-1 h-4 w-4 min-w-4">
                          <Image
                            src={`/images/world/${item.world_name}.png`}
                            alt={item.world_name}
                            fill
                            priority
                            unoptimized
                          />
                        </div>
                        <p
                          className={`text-xl font-semibold ${
                            isMaster
                              ? "text-yellow-600 dark:text-yellow-400"
                              : ""
                          }`}
                        >
                          {item.character_name}
                        </p>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300">
                        Lv.{item.character_level}
                      </p>
                      <p className="text-gray-500 dark:text-gray-400">
                        {item.character_class}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GuildList;
