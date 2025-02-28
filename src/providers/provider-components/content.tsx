import React from "react";

const Content = ({ children }: { children: React.ReactNode }) => {
  return <div className="min-h-screen ">{children}</div>;
};

export default Content;
