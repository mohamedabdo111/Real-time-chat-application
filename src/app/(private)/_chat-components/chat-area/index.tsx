import React from "react";
import Recipient from "./recipient";
import NewMessage from "./new-message";
import Messages from "./messages";
import { IChatState } from "@/redux/chatSlice";
import { useSelector } from "react-redux";
import ChatImage from "@/Images/talk.png";
import Image from "next/image";
const ChatArea = () => {
  const { selectedChat }: IChatState = useSelector((state: any) => state.chat);

  if (!selectedChat) {
    return (
      <div className=" flex flex-1 flex-col justify-center items-center p-3 h-full">
        <div className="text-center text-2xl flex flex-col items-center gap-3">
          <Image src={ChatImage} alt="images" width={250} height={250}></Image>
          <span className="text-primary text-sm">
            Select a chat to start messaging
          </span>
        </div>
      </div>
    );
  }
  return (
    <div className=" flex flex-1 flex-col justify-between ">
      <Recipient />
      <Messages />
      <NewMessage />
    </div>
  );
};

export default ChatArea;
