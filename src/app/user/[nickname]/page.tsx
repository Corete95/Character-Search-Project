import React from "react";
import { Metadata } from "next";
import { HydrationBoundary } from "@tanstack/react-query";
import TabsComponent from "./_component/TabsComponent";
import dayjs from "@/lib/dayjs-ssr";
import { getDehydratedState } from "./_constants/getDehydratedState";
import { generateMeta } from "./_constants/generateMeta";
import ErrorPage from "@/components/ErrorPage";

const day = dayjs().subtract(1, "day").format("YYYY-MM-DD");
export const generateMetadata = async ({
  params,
}: {
  params: { nickname: string };
}): Promise<Metadata> => {
  return await generateMeta(params.nickname, day);
};

const NickNamePage = async ({ params }: { params: { nickname: string } }) => {
  try {
    const dehydratedState = await getDehydratedState(params.nickname, day);
    if ("error" in dehydratedState && dehydratedState.error) {
      throw new Error(dehydratedState.message);
    }

    return (
      <HydrationBoundary state={dehydratedState}>
        <TabsComponent params={params} day={day} />
      </HydrationBoundary>
    );
  } catch (error: any) {
    return <ErrorPage error={error.message} />;
  }
};

export default NickNamePage;
