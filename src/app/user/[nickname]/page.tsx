import React, { Suspense } from "react";
import Loading from "./loading";
import dynamic from "next/dynamic";
import { Metadata } from "next";

export const generateMetadata = async ({ params }: any): Promise<Metadata> => {
  return {
    title: `${decodeURIComponent(params.nickname)} | Mesoya `,
    description: `${decodeURIComponent(params.nickname)} 정보 페이지 `,
  };
};

const TabsComponent = dynamic(() => import("./_component/TabsComponent"), {
  ssr: false,
});

const NickNamePage = () => {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <TabsComponent />
      </Suspense>
    </div>
  );
};

export default NickNamePage;
