import { InputFormProps } from "@/types/platinum.type";
import Image from "next/image";
import React from "react";

const InputForm = ({
  totalUsed,
  itemCounts,
  onTotalUsedChange,
  onItemCountChange,
  onCalculate,
  items,
}: InputFormProps) => (
  <div className="userContainer w-full rounded-lg desktop:w-[67%]">
    <div className="w-full overflow-hidden rounded-lg shadow-lg">
      <div className="bg-orange-400 p-4 text-white">
        <h2 className="text-2xl font-bold">사용자 정보 입력</h2>
      </div>
      <div className="p-4">
        <div className="mb-4">
          <label className="mb-2 block text-xl font-semibold">
            총 사용 횟수
          </label>
          <input
            type="number"
            value={totalUsed}
            onChange={(e) => onTotalUsedChange(e.target.value)}
            className="w-full rounded-md border border-userBorder p-2 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 dark:border-0"
          />
        </div>
        <div className="border-gray-200 my-4 border-t"></div>
        <h3 className="mb-2 text-xl font-semibold">아이템 획득 횟수</h3>
        <div className="max-h-[calc(100vh-223px)] space-y-2 overflow-y-auto pt-1">
          {items.map((item, index) => (
            <div key={index} className="flex items-center px-2">
              <Image
                src={`/images/platinumApple/${encodeURIComponent(item.name)}.png`}
                alt={item.name}
                style={{ objectFit: "cover", marginRight: "4px" }}
                width={28}
                height={28}
                priority
                unoptimized
              />
              <label className="w-2/3 text-sm">{item.name}</label>
              <input
                type="number"
                value={itemCounts[index]}
                onChange={(e) => onItemCountChange(index, e.target.value)}
                className="w-1/3 rounded-md border border-userBorder px-3 py-1 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 dark:border-0"
              />
            </div>
          ))}
        </div>
        <div className="mt-4">
          <button
            className="w-full rounded-md bg-orange-400 p-2"
            onClick={onCalculate}
          >
            계산하기
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default InputForm;
