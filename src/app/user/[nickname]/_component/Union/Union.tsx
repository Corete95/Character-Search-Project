import React from "react";
import { useUnionQuery } from "@/hooks/queries/useUnionQuery";
import UnionBlock from "./UnionBlock";

const Union = ({ ocid }: { ocid: string }) => {
  const { data, isLoading, isError, error } = useUnionQuery(ocid);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="flex flex-wrap justify-between">
      <div className="w-full desktop:w-1/2">
        <UnionBlock data={data} />
      </div>
      <div className="w-full desktop:w-[49%]">
        <div className="userContainer p-2">
          <div className="rounded bg-[#94a3b84d] p-1 text-center font-bold">
            아티팩트
          </div>
        </div>
      </div>
    </div>
  );
};

export default Union;
