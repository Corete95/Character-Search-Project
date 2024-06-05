import dynamic from "next/dynamic";
import React from "react";
import type { Metadata } from "next";
import Chart from "@/app/coinage/_component/Chart";

export const metadata: Metadata = {
  title: "메소야 주화 | Mesoya",
  description: "메소야 주화 시세 페이지",
};

const page = () => {
  return (
    <div>
      <Chart />
    </div>
  );
};

export default page;
