"use client";
import React from "react";
import { RecoilRoot } from "recoil";

interface RecoilRootWrapperProps {
  children: React.ReactNode;
}

const RecoilWrapperProvider = ({ children }: RecoilRootWrapperProps) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};

export default RecoilWrapperProvider;
