import React from "react";
import type { Metadata } from "next";
import CoinageOverview from "./_component/CoinageOverview";
import Test from "./Test";

export const metadata: Metadata = {
  title: "메소야 주화 | Mesoya",
  description: "메소야 주화 시세 페이지",
};

const page = () => {
  const sampleData = [
    { id: 1, time: "2024-02-22", price: 37670100 },
    { id: 2, time: "2024-02-23", price: 37800000 },
    { id: 3, time: "2024-02-24", price: 37500000 },
    // ... 더 많은 데이터 포인트
  ];
  return (
    // <div>
    //   <CoinageOverview />
    // </div>
    <div style={{ width: "100%", height: "400px" }}>
      <Test />
    </div>
  );
};

export default page;
