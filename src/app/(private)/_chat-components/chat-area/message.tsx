import { formatDate } from "@/helpers/date-format";
import { IMessageType } from "@/interfaces";
import { IChatState } from "@/redux/chatSlice";
import { IStateUser } from "@/redux/userSlice";
import { Avatar } from "antd";
import React from "react";
import { useSelector } from "react-redux";

const MessageCard = ({ message }: { message: IMessageType }) => {
  const { currentUserData }: IStateUser = useSelector(
    (state: any) => state.user
  );
  const { selectedChat }: IChatState = useSelector((state: any) => state.chat);
  const isLoggedInMessage = message.sender._id === currentUserData._id;

  let read = false;
  if (
    selectedChat &&
    selectedChat?.users?.length - 1 === message.readBy.length
  ) {
    read = true;
  }

  if (isLoggedInMessage) {
    return (
      <div className="flex justify-end gap-3">
        <div className="flex flex-col items-end">
          <p className=" bg-primary text-white rounded-xl rounded-tl-none p-2 px-4 w-fit">
            {message.textmessage}
          </p>
          <i
            className={`ri-check-double-line ${read ? "text-green-500" : ""}`}
          ></i>
          <span className="text-gray-500 text-sm">
            {formatDate(message.createdAt ?? message.sender.createdAt)}
          </span>
        </div>
        <Avatar src={message.sender.profileImage} size={30}></Avatar>
      </div>
    );
  } else {
    return (
      <div className="flex justify-start gap-3">
        <Avatar src={message.sender.profileImage} size={30}></Avatar>
        <div className="flex flex-col items-start">
          <div className=" bg-gray-200 text-black rounded-xl rounded-tr-none p-2 px-12 w-fit">
            <span className="text-xs text-blue-500 ">
              {message.sender.name}
            </span>
            <p>{message.textmessage}</p>
          </div>
          <span className="text-gray-500 text-sm">
            {formatDate(message.createdAt ?? message.sender.updatedAt)}
          </span>
        </div>
      </div>
    );
  }
};

export default MessageCard;
