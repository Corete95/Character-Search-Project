import React from "react";
import { InfoType } from "@/types/apis/stat";
import Image from "next/image";
import Badge from "../common/Badge";
interface Props {
  info: InfoType;
}

const UserInfo = ({ info }: Props) => {
  return (
    <div className="flex flex-wrap  w-full rounded-lg bg-white">
      <div className="flex flex-col justify-between p-4 w-1/3">
        <div className="badge dark:bg-badge_1">{info?.character_class}</div>
        <div className="flex flex-col gap-1">
          <Badge label="유니온" value={info.union_level} />
          <Badge label="무릉도장" value={`${info.dojang_best_floor} 층`} />
          <Badge label="인기도" value={info.popularity} />
        </div>
      </div>
      <div className="w-1/3 px-3 text-center">
        <div className="mb-4 leading-none">
          <div className="badge w-auto px-4 rounded-t-none  rounded-md dark:bg-badge_1">
            Lv. {info.character_level}
          </div>
        </div>
        <Image
          src={info?.character_image}
          alt="캐릭터 사진"
          width={96}
          height={96}
          priority
        />
        <div className="badge my-4 px-3 dark:bg-main_gray">
          {info.character_name}
        </div>
      </div>
      <div className="w-1/3 p-4 flex flex-col justify-end gap-1">
        <Badge label="월드" value={info.world_name} />
        <Badge label="길드" value={info.character_guild_name} />
      </div>
      <div className="px-4 w-full mb-2">
        <div className="relative h-4 rounded-full bg-white_gray_100 dark:bg-[#414240]">
          <div
            className="h-4 rounded-full bg-[#AFCD00]"
            style={{ width: `${info.character_exp_rate}%` }}
          ></div>
          <span className="absolute inset-0 flex items-center justify-center text-[9px] font-medium text-gray-900">
            {info.character_exp_rate}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
