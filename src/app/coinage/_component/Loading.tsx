"use client";

import React from "react";
import { Card, Skeleton } from "@nextui-org/react";

const Loading = () => {
  return (
    <div className="w-full p-0 ">
      <Card className="max-w-full h-[350px] space-y-5 p-3 " radius="md">
        <Skeleton className="w-full h-full rounded-lg">
          <div className="rounded-lg bg-default-300 mb-3"></div>
        </Skeleton>
      </Card>
      <div className="max-w-[600px] mx-auto mb-8">
        <div className="flex justify-center gap-3 my-4">
          <Card className="w-[300px] h-[60px] space-y-5 p-3 " radius="md">
            <Skeleton className="w-full h-full rounded-lg">
              <div className="rounded-lg bg-default-300 mb-3"></div>
            </Skeleton>
          </Card>
        </div>
        <Card className="max-w-full h-[550px] space-y-5 p-3 " radius="md">
          <Skeleton className="w-full h-full rounded-lg">
            <div className="rounded-lg bg-default-300 mb-3"></div>
          </Skeleton>
        </Card>
      </div>
    </div>
  );
};

export default Loading;
