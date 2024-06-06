"use client";

import React from "react";
import TableComponent from "./TableComponent";
import ChartComponent from "./ChartComponent";
import { useCoinageQuery } from "@/hooks/queries/useCoinageQuery";

const CoinageOverview = () => {
  const { data, isLoading, isError } = useCoinageQuery();

  if (isLoading) return <div>로딩...</div>;
  if (isError) return <div>에러</div>;
  return (
    <div>
      <ChartComponent data={data} />
      <TableComponent data={data} />
    </div>
  );
};

export default CoinageOverview;
