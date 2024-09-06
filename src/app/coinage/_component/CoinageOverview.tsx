"use client";

import React, { useState } from "react";
import { useCoinageQuery } from "@/hooks/queries/useCoinageQuery";
import TableComponent from "./TableComponent";
import Loading from "./Loading";
import dayjs from "dayjs";
import ChartComponent from "./ChartComponent";
import CardComponent from "./CardComponent";
import {
  analyzePriceData,
  calculatePriceChanges,
} from "../_constants/conversion";
import Image from "next/image";

const CoinageOverview = () => {
  const day = dayjs().format("YYYY년 MM월 DD일");
  const { data, isLoading, isError } = useCoinageQuery();
  const [view, setView] = useState("card");

  const tableData = data ? calculatePriceChanges(data) : [];
  const goldPrice = tableData.length > 0 ? analyzePriceData(tableData) : null;
  const trendColor =
    Number(goldPrice?.percentageIncrease) > 0
      ? "text-red-500"
      : "text-blue-500";

  if (isLoading) return <Loading />;
  if (isError) return <div>에러</div>;

  return (
    <div className="mx-auto max-w-1200">
      <div className="mb-3 mt-1 text-center text-lg font-bold">
        메이플 주화 {day} 시세
      </div>
      {data && data.length > 0 && <ChartComponent data={data} />}
      <div className="mobile:px-2">
        <div
          className={`userContainer my-3 flex justify-between p-4 ${view === "list" && "dark:bg-[#18181b]"}`}
        >
          <div className="flex items-center space-x-3">
            <Image
              src="/images/gold.png"
              alt="골드 주화"
              width={40}
              height={40}
              className="h-10 w-10 object-contain"
            />
            <div>
              <p className="text-gray-600 text-sm">골드주화 최저가격 대비</p>
              <p className={`text-gray-800 text-xl font-bold ${trendColor}`}>
                {goldPrice.priceDifference} / {goldPrice.percentageIncrease}%
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${view === "card" ? "bg-[#f97316] text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
              onClick={() => setView("card")}
            >
              카드
            </button>
            <button
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${view === "list" ? "bg-[#f97316] text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
              onClick={() => setView("list")}
            >
              목록
            </button>
          </div>
        </div>
        <div className="grid max-h-[1000px] grid-cols-2 gap-4 overflow-auto lg:grid-cols-3">
          {view === "card" &&
            tableData.map((item) => <CardComponent key={item.key} {...item} />)}
        </div>
        <div>{view === "list" && <TableComponent data={data} />}</div>
      </div>
    </div>
  );
};

export default CoinageOverview;
