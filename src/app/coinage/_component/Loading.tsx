"use client";

import React from "react";
import { Card, Skeleton } from "@nextui-org/react";

const Loading = () => {
  return (
    <div className="mx-auto max-w-1200 p-0">
      <Card className="h-[400px] max-w-full space-y-5 p-3" radius="md">
        <Skeleton className="h-full w-full rounded-lg">
          <div className="mb-3 rounded-lg bg-default-300"></div>
        </Skeleton>
      </Card>
      <div className="mx-auto mb-8 max-w-1200">
        <div className="my-4 flex justify-center gap-3">
          <Card className="h-[80px] w-full space-y-5 p-3" radius="md">
            <Skeleton className="h-full w-full rounded-lg">
              <div className="mb-3 rounded-lg bg-default-300"></div>
            </Skeleton>
          </Card>
        </div>
        <Card className="h-[550px] max-w-full space-y-5 p-3" radius="md">
          <Skeleton className="h-full w-full rounded-lg">
            <div className="mb-3 rounded-lg bg-default-300"></div>
          </Skeleton>
        </Card>
      </div>
    </div>
  );
};

export default Loading;
