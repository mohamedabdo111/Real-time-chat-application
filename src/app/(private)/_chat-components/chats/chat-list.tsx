import { IChatState, SetChats } from "@/redux/chatSlice";
import { IStateUser } from "@/redux/userSlice";
import { GetAllChats } from "@/server-action/chats";
import { message, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatCard from "./chat-card";
import socket from "@/config/socket-config";
import { IMessageType } from "@/interfaces";
import store from "@/redux/store";

const ChatList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { chats }: IChatState = useSelector((state: any) => state.chat);
  const { selectedChat }: IChatState = useSelector((state: any) => state.chat);
  const { currentUserData }: IStateUser = useSelector(
    (state: any) => state.user
  );

  useEffect(() => {
    const getAllChats = async () => {
      try {
        setIsLoading(true);
        const response = await GetAllChats(currentUserData._id);
        if (response.error) throw new Error(response.error);
        dispatch(SetChats(response));
      } catch (error: any) {
        message.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    if (currentUserData) getAllChats();
  }, [currentUserData]);

  useEffect(() => {
    socket.on("new-message-received", (newMessage: IMessageType) => {
      let { chats }: IChatState = store.getState().chat;

      let prevChats = [...chats];

      // to change the chat message in the chat list and update the last message in chat
      let chatIndex = prevChats.findIndex(
        (chat: any) => chat._id === newMessage.chat._id
      );
      if (chatIndex === -1) return;
      let chatToUpdate = prevChats[chatIndex];
      let chatToUpdateCopy = { ...chatToUpdate };
      chatToUpdateCopy.lastMessage = newMessage;

      prevChats[chatIndex] = chatToUpdateCopy;

      // to push the chat to the top of the chat list
      prevChats = [
        prevChats[chatIndex],
        ...prevChats.filter((chat: any) => chat._id !== newMessage.chat._id),
      ];

      dispatch(SetChats(prevChats));
    });
  }, [selectedChat]);

  return (
    <div>
      <div>
        {isLoading && (
          <div className="flex flex-col justify-center items-center mt-32 gap-3">
            <Spin />
            <span className="ml-2">Loading chats...</span>
          </div>
        )}
        {!isLoading && chats.length > 0 && (
          <div className="flex flex-col gap-1 my-2">
            {chats.map((chat) => {
              return <ChatCard chat={chat} key={chat._id} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatList;
