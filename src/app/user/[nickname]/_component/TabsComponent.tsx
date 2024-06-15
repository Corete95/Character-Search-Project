"use client";

import React, { useState } from "react";
import { Tabs, Tab } from "@nextui-org/react";
import Stat from "./Stat/Stat";
import Equipment from "./Equipment/Equipment";
import Skill from "./Skill/Skill";
import SuspenseAndErrorBoundary from "@/components/SuspenseAndErrorBoundary";
import Loading from "../loading";
import Union from "./Union/Union";
import { useParams } from "next/navigation";
import { useOcidQuery } from "@/hooks/queries/useOcidQuery";

const TabsComponent = () => {
  const [step, setStep] = useState<string | number>("stat");
  const params: { nickname: string } = useParams();
  const { data, isLoading, isError, error } = useOcidQuery(params.nickname);

  const tabs = [
    { key: "stat", title: "스탯", tsx: <Stat ocid={data.ocid} error={error}/> },
    { key: "equipment", title: "장비", tsx: <Equipment ocid={data.ocid} /> },
    { key: "skill", title: "스킬", tsx: <Skill ocid={data.ocid} /> },
    { key: "union", title: "유니온", tsx: <Union ocid={data.ocid} /> },
  ];

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
      <SuspenseAndErrorBoundary suspenseFallback={<Loading />}>
        <div className="mx-3">
          {tabs.find((item) => item.key === step)?.tsx}
        </div>
      </SuspenseAndErrorBoundary>
    </div>
  );
};

export default TabsComponent;
