"use client";
import { IUserType } from "@/interfaces";
import { IStateUser } from "@/redux/userSlice";
import { useClerk } from "@clerk/nextjs";
import { Avatar, Button, Divider, Drawer, message } from "antd";
import { set } from "mongoose";
import { useRouter } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

const CurrentUserInfo = ({
  setShowCurrentUser,
  showCurrentUser,
}: {
  setShowCurrentUser: React.Dispatch<React.SetStateAction<boolean>>;
  showCurrentUser: boolean;
}) => {
  const { currentUserData }: IStateUser = useSelector(
    (state: any) => state.user
  );
  const [loading, setLoading] = React.useState<boolean>(false);
  const router = useRouter();
  const { signOut } = useClerk();
  const onLogout = async () => {
    try {
      setLoading(true);
      await signOut();
      setShowCurrentUser(false);
      message.success("Logout Successfully");
      router.push("/sign-in");
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getInfo = (key: string, value: string) => {
    return (
      <div className="flex flex-col items-start my-2">
        <span className="font-semibold text-xl text-primary">{key}</span>
        <span className=" text-gray-700 ">{value}</span>
      </div>
    );
  };
  return (
    <Drawer
      onClose={() => setShowCurrentUser(false)}
      open={showCurrentUser}
      title={"User Info"}
    >
      <div className="flex justify-center items-center gap-5 p-5">
        <Avatar src={currentUserData?.profileImage} size={75}></Avatar>
      </div>
      <Divider className="w-full h-5"></Divider>
      <div className="my-5 mb-14">
        {getInfo("Name", currentUserData?.name ?? "")}
        {getInfo("UserName", currentUserData?.username ?? "")}
        {getInfo("Id", currentUserData?._id ?? "")}
        {getInfo(
          "Joined At",
          new Date(currentUserData?.createdAt ?? "")
            .toLocaleString()
            .toString() || ""
        )}
      </div>
      <Divider className="w-full h-5"></Divider>
      <div>
        <Button block loading={loading} onClick={onLogout} className="p-5">
          Logout
        </Button>
      </div>
    </Drawer>
  );
};

export default CurrentUserInfo;
