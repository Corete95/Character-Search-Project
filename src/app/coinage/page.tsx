import React from "react";
import type { Metadata } from "next";
import CoinageOverview from "./_component/CoinageOverview";

export const metadata: Metadata = {
  title: "메소야 주화 | Mesoya",
  description: "메소야 주화 시세 페이지",
};

const page = () => {

  return (
    <div>
      <CoinageOverview />
    </div>
  );
};

export default page;
