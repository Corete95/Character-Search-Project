"use client";

import React from "react";
import { useGuildBasicQuery } from "../../../../hooks/queries/useGuildBasicQuery";
import GuildList from "./_component/GuildList";
import Image from "next/image";
import dayjs from "@/lib/dayjs-ssr";
import GuildSkillList from "./_component/GuildSkillList";
import { GuildDataType, GuildSkillType } from "@/types/apis/guild.type";

const GuildDetail = ({ params }: any) => {
  const day = dayjs().format("YYYY-MM-DD");
  const { data, guildData, isLoading, isError, error } = useGuildBasicQuery(
    day,
    params.name,
    params.world,
  );
  // console.log("data,", data);
  return (
    <div className="">
      <div className="relative">
        <div className="flexCenter mx-auto h-[380px] max-w-1200">
          <div className="absolute top-0 h-[420px] w-full mobile:h-[570px]">
            <Image
              alt=""
              src="/images/main.jpg"
              style={{ objectFit: "cover" }}
              fill
              priority
            />
            <div className="absolute left-0 top-0 h-full w-full dark:bg-[#00000080]"></div>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-3 w-full max-w-1200 px-2">
        <div className="relative rounded-lg bg-modeWhite px-4 py-2 dark:bg-dark_gray">
          <section className="userContainer grid grid-cols-2 desktop:grid-cols-5">
            {guildData?.map((item: GuildDataType, index: number) => (
              <div
                className={`flex h-100px flex-col justify-center border-b-1 border-r-1 border-[#e9eaed] pl-5 font-bold dark:border-[#e9eaed1c] ${index === 0 ? "mobile:col-start-1 mobile:col-end-3" : ""}`}
                key={`${item.title}+${index}`}
              >
                <p className="text-sm text-zinc-500">{item.title}</p>
                {item.content.includes("/") ? (
                  item.content.split("/").map((content) => (
                    <p className="text-[15px] mobile:text-xs" key={content}>
                      {content}
                    </p>
                  ))
                ) : (
                  <p>{item.content}</p>
                )}
              </div>
            ))}
          </section>
          <section className="userContainer mt-3">
            <div className="flex flex-col gap-2 p-2">
              <GuildSkillList
                title={`길드 노블레스 스킬(노블 :${data.guild_noblesse_skill.reduce((total: number, skill: GuildSkillType) => total + skill.skill_level, 0)}점)`}
                data={data.guild_noblesse_skill}
                type={"nolbe"}
              />
              <GuildSkillList
                title={"길드 스킬"}
                data={data.guild_skill}
                type={"guild"}
              />
            </div>
          </section>
        </div>
        <GuildList list={data?.guild_member} master={data?.guild_master_name} />
      </div>
    </div>
  );
};

export default GuildDetail;
