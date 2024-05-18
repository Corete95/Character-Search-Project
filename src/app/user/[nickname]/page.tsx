"use client";

import React, { useState, Suspense } from "react";
import { Tabs, Tab } from "@nextui-org/react";
import Stat from "./Stat";
import Equipment from "./Equipment";
import Skill from "./Skill";
import SuspenseAndErrorBoundary from "@/components/SuspenseAndErrorBoundary";
import ErrorFallback from "@/components/ErrorFallback";

const NickNamePage = () => {
  const [step, setStep] = useState<string | number>("stat");

  const tabs = [
    { key: "stat", title: "스탯", tsx: <Stat /> },
    { key: "equipment", title: "장비", tsx: <Equipment /> },
    { key: "skill", title: "스킬", tsx: <Skill /> },
    { key: "union", title: "유니온", tsx: <Equipment /> },
  ];

  console.log("step", step);

  return (
    <div className="my-4">
      <div className="mb-4">
        <Tabs
          key="underlined"
          variant="underlined"
          aria-label="Tabs variants"
          selectedKey={step}
          onSelectionChange={(key: string | number) => setStep(key)}
        >
          {tabs.map((item) => (
            <Tab key={item.key} title={item.title} className="text-sm p-3" />
          ))}
        </Tabs>
      </div>
      {/* <Suspense fallback={<div>스켈레톤 컴포넌트 생성 예정</div>}>
        <div className="mx-3">
          {tabs.find((item) => item.key === step)?.tsx}
        </div>
      </Suspense> */}
      <SuspenseAndErrorBoundary
        errorFallback={<ErrorFallback />}
        suspenseFallback={<div>스켈레톤 컴포넌트 생성 예정~~</div>}
      >
        <div className="mx-3">
          {tabs.find((item) => item.key === step)?.tsx}
        </div>
      </SuspenseAndErrorBoundary>
    </div>
  );
};

export default NickNamePage;
