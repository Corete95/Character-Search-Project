import React from "react";
import Image from "next/image";
import {
  crystalOptionsShortNames,
  getArtifactCombine,
} from "../../_constants/unionItem";
import dayjs from "@/lib/dayjs-ssr";
import { ArtrifactType } from "@/types/apis/union.type";

const ArtifactBlock = ({
  artifact,
  common,
}: {
  artifact: ArtrifactType;
  common: any;
}) => {

  return (
    <div className="userContainer flex flex-col gap-2 p-2">
      <div className="rounded bg-[#94a3b84d] p-1 text-center font-bold">
        아티팩트
      </div>
      <div className="flexCenter gap-3 rounded bg-[#94a3b84d] py-[19px]">
        <div className="font-bold">
          <p>아티팩트 Lv. {common.union_artifact_level}</p>
        </div>
        <div className="h-10 border-r-1"></div>
        <div className="flex flex-col justify-center font-bold">
          <p>아티팩트 포인트 : {common.union_artifact_point}</p>
          <p>아이팩트 AP : {artifact.union_artifact_remain_ap}</p>
        </div>
      </div>
      <div className="rounded bg-[#94a3b84d]">
        <div className="flex flex-wrap gap-[6px] gap-y-2 p-2">
          {artifact.union_artifact_crystal.map((item, index) => (
            <div
              key={index}
              className={`flexCenter w-[32%] flex-col gap-1 rounded ${item.level === 5 ? "bg-artifact_purple" : "bg-artifact_blue"}`}
            >
              <div className="flex gap-1 pt-3">
                {Array.from({ length: item.level }, (_, index) => (
                  <svg
                    key={index}
                    xmlns="http://www.w3.org/2000/svg"
                    width="7"
                    height="6"
                    viewBox="0 0 7 6"
                    fill="none"
                  >
                    <path
                      d="M2.48296 0.421271C3.04466 -0.140423 3.95534 -0.140424 4.51704 0.42127L6.07873 1.98296C6.64042 2.54466 6.64042 3.45534 6.07873 4.01704L4.51704 5.57873C3.95534 6.14042 3.04466 6.14042 2.48296 5.57873L0.921271 4.01704C0.359577 3.45534 0.359576 2.54466 0.92127 1.98296L2.48296 0.421271Z"
                      fill={item.level === 5 ? "#6D62A1" : "#5393CA"}
                    ></path>
                  </svg>
                ))}
              </div>
              <Image
                src={getArtifactCombine(item)}
                alt={item.name}
                width={70}
                height={70}
              />
              <div
                className={`text-11px ${item.validity_flag === "0" ? "text-zinc-500" : "text-red-600"} `}
              >
                {item.validity_flag === "0"
                  ? `${dayjs(item.date_expire).format("M월D일")} 만료`
                  : "사용 만료"}
              </div>
              <div
                className={`flexCenter h-20px w-full gap-1 text-11px text-black ${item.level === 5 ? "bg-artifact_bt_purple" : "bg-artifact_bt_blue"}`}
              >
                {[1, 2, 3].map((num) => (
                  <span key={`${item.name}-${num}0`}>
                    {
                      crystalOptionsShortNames[
                        item[`crystal_option_name_${num}`]
                      ]
                    }
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded bg-[#94a3b84d] px-2">
        <p className="p-1 text-center font-bold">아티팩트 효과</p>
        <div className="border-b-1 border-[#999999]"></div>

        <div className="flex flex-col gap-y-1 py-2">
          {artifact.union_artifact_effect.map((item) => (
            <div key={item.name} className="flex gap-2 text-xs">
              <span className="flexCenter w-8 rounded bg-[#e9eaed] text-11px font-bold dark:bg-slate-500">
                Lv.{item.level}
              </span>
              <span className="line-clamp-1">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArtifactBlock;
