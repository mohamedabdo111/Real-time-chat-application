import { formatDate } from "@/helpers/date-format";
import { IChatType } from "@/interfaces";
import { IChatState, setSelectedChat } from "@/redux/chatSlice";
import { IStateUser } from "@/redux/userSlice";
import { Avatar } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const ChatCard = ({ chat }: { chat: IChatType }) => {
  const dispatch = useDispatch();
  const { currentUserData, onlineUsers }: IStateUser = useSelector(
    (state: any) => state.user
  );

  const { selectedChat }: IChatState = useSelector((state: any) => state.chat);
  const isSeletcedChat = selectedChat?._id === chat._id;
  let chatName = "";
  let chatProfilePic = "";
  let lastMessage = "";
  let lastMessageTime = "";
  let chatSender = "";
  if (chat.isGroupChat) {
    chatName = chat.groupName;
    chatProfilePic = chat.groupeProfilePicture;
  } else {
    const recipient = chat.users.find(
      (user) => user._id !== currentUserData._id
    );
    // console.log(recipient);
    chatName = recipient?.name!;
    chatProfilePic = recipient?.profileImage!;
    // lastMessage = recipi
    // ent?.lastMessage!;
  }

  if (chat?.lastMessage) {
    lastMessage = chat?.lastMessage?.textmessage;
    lastMessageTime = formatDate(chat?.lastMessage?.updatedAt);
    chatSender =
      chat?.lastMessage?.sender?._id === currentUserData._id
        ? "You :"
        : chat?.lastMessage?.sender?.name.split(" ")[0] + " : " || "";
  }

  const onlineIndicator = () => {
    if (chat.isGroupChat) return;
    const recipientID = chat?.users.find(
      (user) => user._id !== currentUserData._id
    )?._id;

    if (onlineUsers.includes(recipientID!))
      return (
        <div>
          <span className="w-2 h-2 bg-green-700 block rounded-full"></span>
        </div>
      );
  };
  onlineIndicator();

  return (
    <div
      className={`flex  justify-between hover:bg-gray-100 p-3 items-start rounded-md cursor-pointer ${
        isSeletcedChat ? "bg-gray-100" : ""
      }`}
      onClick={() => dispatch(setSelectedChat(chat))}
    >
      <div className="flex flex-col ">
        <div className="flex items-center gap-3">
          <Avatar src={chatProfilePic} size={35}></Avatar>

          <div className="flex flex-col items-start ">
            <div className="flex items-center gap-2">
              <span>{chatName}</span>
              {onlineIndicator()}
            </div>
            <div className=" flex justify-center">
              <p className="text-gray-500 text-sm">
                {chatSender} {lastMessage}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <span>{lastMessageTime}</span>
      </div>
    </div>
  );
};

export default ChatCard;
