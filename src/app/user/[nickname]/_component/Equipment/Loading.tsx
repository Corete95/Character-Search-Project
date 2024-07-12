import React from "react";
import { Card, Skeleton } from "@nextui-org/react";

const Loading = () => {
  return (
    <div className="flex flex-wrap gap-5 p-4 mobile:p-0">
      <div className="flex w-full desktop:flex-1">
        <Card className="w-full space-y-5 p-3" radius="md">
          <Skeleton className="rounded-lg">
            <div className="h-[665px] rounded-lg bg-default-300"></div>
          </Skeleton>
        </Card>
      </div>
      <div className="flex w-full desktop:flex-1">
        <Card className="w-full space-y-5 p-3" radius="md">
          <Skeleton className="rounded-lg">
            <div className="h-[665px] rounded-lg bg-default-300"></div>
          </Skeleton>
        </Card>
      </div>
    </div>
  );
};

export default Loading;
