"use client";

import React from "react";
import TableComponent from "./TableComponent";
import ChartComponent from "./ChartComponent";
import Loading from "./Loading";
import { useCoinageQuery } from "@/hooks/queries/useCoinageQuery";

const CoinageOverview = () => {
  const { data, isLoading, isError } = useCoinageQuery();

  if (isLoading) return <Loading />;
  if (isError) return <div>에러</div>;
  return (
    <div>
      <ChartComponent data={data} />
      <TableComponent data={data} />
    </div>
  );
};

export default CoinageOverview;
