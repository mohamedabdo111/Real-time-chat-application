import Loader from "@/components/loading";
import { IStateUser } from "@/redux/userSlice";
import React from "react";
import { useSelector } from "react-redux";

const Content = ({ children }: { children: React.ReactNode }) => {
  const { currentUserData }: IStateUser = useSelector(
    (state: any) => state.user
  );
  // if (!currentUserData) return <Loader />;
  return <div className="min-h-screen ">{children}</div>;
};

export default Content;
