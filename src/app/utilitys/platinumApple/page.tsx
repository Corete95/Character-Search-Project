"use client";

import React, { useState } from "react";
import Image from "next/image";
import { platinumAppleProbability } from "./_constants/data";

const PlatinumApplePage = () => {
  const platinumAppleData = platinumAppleProbability;
  const [totalUsed, setTotalUsed] = useState("0");
  const [itemCounts, setItemCounts] = useState(
    platinumAppleData.map(() => "0"),
  );
  const [calculationResult, setCalculationResult] = useState([]);

  const handleTotalUsedChange = (e) => {
    setTotalUsed(e.target.value);
  };

  const handleItemCountChange = (index, value) => {
    const newCounts = [...itemCounts];
    newCounts[index] = value;
    setItemCounts(newCounts);
  };

  const handleCalculate = () => {
    if (totalUsed === "0") {
      return setCalculationResult([
        { name: "오류", message: "총 사용횟수를 입력해주세요." },
      ]);
    }
    const totalUsedInt = parseInt(totalUsed || 0);
    const totalItemCount = itemCounts.reduce(
      (sum, count) => sum + parseInt(count || 0),
      0,
    );

    if (totalUsedInt !== totalItemCount) {
      setCalculationResult([
        {
          name: "오류",
          message: `총 사용횟수가 틀립니다. 총 사용 횟수:${totalUsed}, 아이템 획득 횟수:${totalItemCount}`,
        },
      ]);
      return;
    }

    const results = platinumAppleData.map((item, index) => {
      const count = parseInt(itemCounts[index] || 0);
      const actualProbability = (count / totalUsedInt) * 100;

      return {
        name: item.name,
        expectedProbability: item.probability.toFixed(2),
        actualProbability: actualProbability.toFixed(2),
      };
    });

    setCalculationResult(results);
  };

  return (
    <div className="mx-auto mt-10 min-h-[700px] w-full max-w-1200">
      <div className="flex flex-wrap justify-between">
        <div className="userContainer w-full desktop:w-[30%]">
          <div className="w-full overflow-hidden rounded-lg bg-white shadow-lg">
            <div className="bg-orange-400 p-4 text-white">
              <h2 className="text-2xl font-bold">아이템 확률 정보</h2>
            </div>
            <div className="max-h-[calc(100vh-100px)] overflow-y-auto">
              {platinumAppleData.map((item, index) => (
                <div
                  key={index}
                  className="hover:bg-gray-50 flex items-center px-4 py-1 transition-colors"
                >
                  <div className="mr-4 flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-zinc-200">
                    <Image
                      src={`/images/platinumApple/${encodeURIComponent(item.name)}.png`}
                      alt={item.name}
                      style={{ objectFit: "cover" }}
                      width={32}
                      height={32}
                      priority
                      unoptimized
                    />
                  </div>
                  <div>
                    <p className="text-gray-800 text-sm font-medium">
                      {item.name}
                    </p>
                    <p className="text-xs text-zinc-500">
                      확률: {item.probability}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full desktop:w-[67%]">
          <div className="w-full overflow-hidden rounded-lg bg-white shadow-lg">
            <div className="bg-orange-400 p-4 text-white">
              <h2 className="text-2xl font-bold">사용자 정보 입력</h2>
            </div>
            <div className="p-4">
              <div className="mb-4">
                <label className="text-gray-700 mb-1 block text-sm font-medium">
                  총 사용 횟수:
                </label>
                <input
                  type="number"
                  value={totalUsed}
                  onChange={handleTotalUsedChange}
                  className="border-gray-300 w-full rounded-md border p-2 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>
              <div className="border-gray-200 my-4 border-t"></div>
              <h3 className="mb-2 text-xl font-semibold">아이템 획득 횟수</h3>
              <div className="max-h-[calc(100vh-150px)] space-y-2 overflow-y-auto pt-1">
                {platinumAppleData.map((item, index) => (
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
                    <label className="text-gray-600 w-2/3 text-sm">
                      {item.name}
                    </label>
                    <input
                      type="number"
                      value={itemCounts[index]}
                      onChange={(e) =>
                        handleItemCountChange(index, e.target.value)
                      }
                      className="border-gray-300 w-1/3 rounded-md border px-3 py-1 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                    />
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <button
                  className={`w-full rounded-md bg-orange-300 p-2`}
                  onClick={handleCalculate}
                >
                  계산하기
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 w-full overflow-hidden rounded-lg bg-white shadow-lg">
          {calculationResult.length > 0 && (
            <div className="bg-gray-100 mt-4 rounded-md p-4">
              <h3 className="mb-2 px-1 text-lg font-semibold desktop:px-6">
                계산 결과
              </h3>
              {calculationResult[0].name === "오류" ? (
                <p className="text-red-500">{calculationResult[0].message}</p>
              ) : (
                <div className="px-1 desktop:px-6">
                  <div className="flex justify-between rounded-md bg-orange-400 p-1">
                    <span className="w-1/3 pr-7 text-center">아이템</span>
                    <span>실제 확률</span>
                    <span>나의 확률</span>
                  </div>
                  {calculationResult.map((result, index) => (
                    <div
                      key={index}
                      className="mt-1 flex justify-between text-sm"
                    >
                      <div className="flex w-1/3">
                        <Image
                          src={`/images/platinumApple/${encodeURIComponent(result.name)}.png`}
                          alt={result.name}
                          style={{ objectFit: "cover", marginRight: "4px" }}
                          width={24}
                          height={24}
                          priority
                          unoptimized
                        />
                        <span className="line-clamp-1">{result.name}</span>
                      </div>
                      <span className="w-1/6 text-right">
                        {result.expectedProbability}%
                      </span>
                      <span className="w-1/6 text-right desktop:pr-2">
                        {result.actualProbability}%
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlatinumApplePage;
