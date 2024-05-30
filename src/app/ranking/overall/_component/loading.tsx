"use client";

import React from "react";
import { Card, Skeleton } from "@nextui-org/react";

const Loading = () => {
  return (
    <div className="w-full p-0 ">
      <Card className="max-w-full h-full space-y-5 p-3 " radius="md">
        {Array.from(Array(15), (_, index) => (
          <Skeleton className="rounded-lg" key={index}>
            <div className="w-full h-7 rounded-lg bg-default-300 mb-3"></div>
          </Skeleton>
        ))}
      </Card>
    </div>
  );
};

export default Loading;
