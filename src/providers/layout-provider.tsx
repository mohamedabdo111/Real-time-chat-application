"use client";
import React from "react";
import Content from "./provider-components/content";
import Header from "./provider-components/header";

const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header></Header>
      <Content>{children}</Content>
    </div>
  );
};

export default LayoutProvider;
