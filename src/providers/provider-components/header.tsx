"use client";
import { GetCurrentUserUsingMongoDB } from "@/server-action/GetCurrentUserUsingMongoDB";
import { Avatar } from "antd";
import React, { useEffect } from "react";
import CurrentUserInfo from "@/providers/provider-components/current-user-info";
import { IUserType } from "@/interfaces";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { IStateUser, SetCurrentUser } from "@/redux/userSlice";
const Header = () => {
  const [showCurrentUser, setShowCurrentUser] = React.useState<boolean>(false);
  const pathname = usePathname();

  const { currentUserData }: IStateUser = useSelector(
    (state: any) => state.user
  );

  const isPathname =
    pathname.includes("sign-in") || pathname.includes("sign-up");
  // if (isPathname) return null;
  const dispatch = useDispatch();
  const getCurrentUser = async () => {
    try {
      const response = await GetCurrentUserUsingMongoDB();
      if (response.error) throw new Error(response.error);
      dispatch(SetCurrentUser(response as IUserType));
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);
  return (
    <div className="flex justify-between items-center px-5 py-4 bg-gray-200 !border-b-2 !border-gray-300">
      <h3 className=" text-xl uppercase">Chat App</h3>
      <div className="flex items-center gap-5">
        <span>{currentUserData?.name}</span>
        <Avatar
          src={currentUserData?.profileImage}
          className="cursor-pointer"
          onClick={() => setShowCurrentUser(!showCurrentUser)}
        ></Avatar>
      </div>
      <CurrentUserInfo
        setShowCurrentUser={setShowCurrentUser}
        showCurrentUser={showCurrentUser}
      ></CurrentUserInfo>
    </div>
  );
};

export default Header;
