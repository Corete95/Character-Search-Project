"use client";

import React from "react";
import { Card, Skeleton } from "@nextui-org/react";

const Loading = () => {
  return (
    <div className="mx-3">
      <div className="flex justify-center items-center w-3/6 m-auto tablet:w-full mobile:w-full">
        <div className="w-full desktop:p-4">
          <Card className="max-w-[819px] space-y-5 p-3 " radius="md">
            <Skeleton className="rounded-lg">
              <div className="h-[270px] rounded-lg bg-default-300"></div>
            </Skeleton>
          </Card>
        </div>
      </div>
      <div className="flex flex-wrap mt-4 tablet:flex-col mobile:flex-col">
        <div className="desktop:w-3/12 responsive_2 ">
          <div className="w-full">
            <Card className="desktop:max-w-[330px] space-y-5 p-3" radius="md">
              <Skeleton className="rounded-lg">
                <div className="h-[680px] rounded-lg bg-default-300"></div>
              </Skeleton>
            </Card>
          </div>
        </div>
        <div className="desktop:w-3/6 responsive_1 rounded-xl desktop:p-4 shadow-md border border-[#dcdcdc] dark:border-0">
          <Card className="max-w-[819px] space-y-5 p-3" radius="md">
            <Skeleton className="rounded-lg">
              <div className="h-[680px] rounded-lg bg-default-300"></div>
            </Skeleton>
          </Card>
        </div>
        <div className="desktop:w-3/12 responsive_3">
          <Card className="desktop:max-w-[330px] space-y-5 p-3" radius="md">
            <Skeleton className="rounded-lg">
              <div className="h-[270px] rounded-lg bg-default-300"></div>
            </Skeleton>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Loading;
