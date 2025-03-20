import { IStateUser } from "@/redux/userSlice";
import { IChatState } from "@/redux/chatSlice";
import { Avatar, Divider, Drawer } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { IUserType } from "@/interfaces";

const RecipientInfo = ({
  showDrawer,
  setShowDrawer,
}: {
  showDrawer: boolean;
  setShowDrawer: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { currentUserData }: IStateUser = useSelector(
    (state: any) => state.user
  );
  const { selectedChat }: IChatState = useSelector((state: any) => state.chat);
  console.log(selectedChat);
  let ChatName = "";
  let ChatImage = "";

  if (selectedChat?.isGroupChat) {
    ChatName = selectedChat?.groupName;
    ChatImage = selectedChat?.groupeProfilePicture;
  } else {
    const recipient = selectedChat?.users.find(
      (user) => user._id !== currentUserData._id
    );
    ChatName = recipient?.name!;
    ChatImage = recipient?.profileImage!;
  }

  const getProprieties = (key: string, value: string) => {
    return (
      <div className="flex flex-col gap-2">
        <span className="font-semibold text-xl text-primary">{key}</span>
        <span className=" text-gray-700 ">{value}</span>
      </div>
    );
  };
  return (
    <Drawer
      open={showDrawer}
      onClose={() => setShowDrawer(false)}
      title={ChatName}
    >
      <div className="flex flex-col items-center gap-5">
        <Avatar src={ChatImage} size={80}></Avatar>
        <span className="text-xl text-gray-500">{ChatName}</span>
      </div>
      <Divider type="horizontal" className="border-2" />
      <div className=" flex flex-col gap-2">
        <span className="font-semibold text-lg text-primary">
          {selectedChat?.users.length} Members
        </span>
        {selectedChat?.isGroupChat &&
          selectedChat?.users.map((user) => {
            return (
              <div className="flex items-center gap-2 my-1">
                <Avatar src={user.profileImage} size={30}></Avatar>
                <span>{user.name}</span>
              </div>
            );
          })}
      </div>

      <Divider type="horizontal" className="border-2" />
      {getProprieties("Created On", selectedChat?.createdAt!)}
      {getProprieties(
        "Created By",
        (selectedChat?.createdBy as IUserType)?.name!
      )}
    </Drawer>
  );
};

export default RecipientInfo;
