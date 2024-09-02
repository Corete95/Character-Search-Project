"use client";
import { useCoinageQuery } from "@/hooks/queries/useCoinageQuery";
import React from "react";
import Test1 from "./Test1";
import { conversion } from "./_constants/conversion";

const Test: React.FC = () => {
  const { data, isLoading, isError } = useCoinageQuery();
  if (isLoading) return <div className="text-center">Loading...</div>;

  //return <div>{data && <Test1 data={data} />}</div>;
  return (
    <div className="flex w-full justify-center">
      <div className="mx-auto w-full max-w-[1200px] p-4">
        {data && data.length > 0 && <Test1 data={data} />}
      </div>
    </div>
  );
};

export default Test;
