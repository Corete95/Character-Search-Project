import React from "react";
import type { Metadata } from "next";
import CoinageOverview from "./_component/CoinageOverview";
import dayjs from "dayjs";

export const metadata: Metadata = {
  title: "메소야 주화 | Mesoya",
  description: "메소야 주화 시세 페이지",
};

const page = () => {
  const day = dayjs().format("YYYY년 MM월 DD일");

  return (
    <div>
      <div className="text-lg text-center font-bold mb-3 mt-1">
        메이플 주화 {day} 시세
      </div>
      <CoinageOverview />
    </div>
  );
};

export default page;
