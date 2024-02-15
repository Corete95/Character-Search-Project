import React from "react";
import Image from "next/image";

const UserStat = ({ props }: any) => {
  console.log("????", props);
  return (
    <div className="flex flex-wrap  w-full rounded-lg dark:bg-white">
      <div className="flex flex-col justify-between p-4 w-1/3">
        <div className="badge dark:bg-badge_1 text-white ">
          {props.character_class}
        </div>
        <div className="flex flex-col gap-1">
          <div className="badge dark:bg-badge_2 ">1</div>
          <div className="badge dark:bg-badge_2 ">2</div>
          <div className="badge dark:bg-badge_2 ">3</div>
        </div>
      </div>
      <div className="w-1/3 px-3 text-center">
        <div className="mb-4 leading-none">
          <div className="badge w-auto px-4 rounded-t-none  rounded-md dark:bg-badge_1">
            Lv.280
          </div>
        </div>
        <Image
          src={props?.character_image}
          alt="캐릭터 사진"
          width={96}
          height={96}
        />
        <div className="badge my-4 px-3 dark:bg-main_gray">
          {props.character_name}
        </div>
      </div>
      <div className="w-1/3 p-4 flex flex-col justify-end">
        <div className="badge mb-1 dark:bg-badge_2">길드</div>
        <div className="badge dark:bg-badge_2">2</div>
      </div>
      <div className="px-4 w-full mb-2">
        <div className="relative h-4 rounded-full bg-[#414240]">
          <div
            className="h-4 rounded-full bg-[#AFCD00]"
            style={{ width: `${props.character_exp_rate}%` }}
          ></div>
          <span className="absolute inset-0 flex items-center justify-center text-[9px] font-medium text-gray-900">
            {props.character_exp_rate}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserStat;
