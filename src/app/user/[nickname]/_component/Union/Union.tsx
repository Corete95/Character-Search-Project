import React from "react";
import { useUnionQuery } from "@/hooks/queries/useUnionQuery";
import UnionBlock from "./UnionBlock";
import ArtifactBlock from "./ArtifactBlock";

const Union = ({ ocid }: { ocid: string }) => {
  const { data, pending, error } = useUnionQuery(ocid);

  console.log("data", data);
  if (pending) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex flex-wrap justify-between">
      <div className="w-full desktop:w-1/2">
        <UnionBlock union={data[0]} common={data[2]}/>
      </div>
      <div className="w-full desktop:w-[49%]">
        <ArtifactBlock artifact={data[1]} common={data[2]} />
      </div>
    </div>
  );
};

export default Union;
