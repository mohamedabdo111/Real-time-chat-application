import { IChatState } from "@/redux/chatSlice";
import { Avatar } from "antd";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import RecipientInfo from "./recipientInfo";
import socket from "@/config/socket-config";
import { IChatType } from "@/interfaces";
import { IStateUser } from "@/redux/userSlice";

const Recipient = () => {
  const { selectedChat }: IChatState = useSelector((state: any) => state.chat);
  const { currentUserData }: IStateUser = useSelector(
    (state: any) => state.user
  );
  const [showDrawer, setShowDrawer] = React.useState(false);
  const [type, setTyping] = React.useState<boolean>(false);
  const [senderName, setSenderName] = React.useState<string>("");
  let chatName = "";
  let chatImage = "";
  if (selectedChat?.isGroupChat) {
    chatName = selectedChat?.groupName;
    chatImage = selectedChat?.groupeProfilePicture;
  } else {
    const recipient = selectedChat?.users.find(
      (user) => user._id !== currentUserData._id
    );
    chatName = recipient?.name!;
    chatImage = recipient?.profileImage!;
  }

  const TypeAnimation = () => {
    if (type)
      return (
        <span className="text-xs text-gray-500">
          {selectedChat?.isGroupChat && ` ${senderName} is `}Typing...
        </span>
      );
  };

  useEffect(() => {
    const handleTyping = ({
      chat,
      senderName,
    }: {
      chat: IChatType;
      senderName: string;
    }) => {
      if (selectedChat?._id === chat?._id) {
        setTyping(true);

        if (selectedChat?.isGroupChat) {
          setSenderName(senderName);
        }

        setTimeout(() => {
          if (selectedChat?._id === chat?._id) {
            setTyping(false);
          }
        }, 2000);
      }
    };

    // Add the event listener
    socket.on("typing", handleTyping);

    // Cleanup: Remove the event listener when the component unmounts or selectedChat changes
    return () => {
      socket.off("typing", handleTyping);
    };
  }, [selectedChat]);
  return (
    <>
      <div className=" py-2 px-4 border-b border-solid border-gray-200 border-0 bg-gray-50 ">
        <div
          className="flex items-center gap-2 cursor-pointer w-max"
          onClick={() => setShowDrawer(true)}
        >
          <Avatar src={chatImage} size={40} />
          <span>{chatName}</span>
          {TypeAnimation()}
        </div>
      </div>

      <RecipientInfo
        showDrawer={showDrawer}
        setShowDrawer={setShowDrawer}
      ></RecipientInfo>
    </>
  );
};

export default Recipient;
