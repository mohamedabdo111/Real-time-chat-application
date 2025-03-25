import { IChatState } from "@/redux/chatSlice";
import { GetChatMessage, ReadAllMessages } from "@/server-action/messages";
import { message, Spin } from "antd";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import MessageCard from "./message";
import { IMessageType } from "@/interfaces";
import socket from "@/config/socket-config";
import { IStateUser } from "@/redux/userSlice";

const Messages = () => {
  const [messages, setMessages] = React.useState<IMessageType[]>([]);
  console.log(messages);
  const [loading, setLoading] = React.useState(false);
  const { selectedChat, chats }: IChatState = useSelector(
    (state: any) => state.chat
  );
  const { currentUserData }: IStateUser = useSelector(
    (state: any) => state.user
  );
  const messageRef = React.useRef<HTMLDivElement>(null);
  useEffect(() => {
    const getAllMessages = async () => {
      try {
        setLoading(true);
        const response = await GetChatMessage(selectedChat?._id!);
        if (response.error) throw new Error(response.error);
        setMessages(response);
      } catch (error: any) {
        message.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    getAllMessages();
  }, [selectedChat]);

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollTop = messageRef.current.scrollHeight + 100;
    }
    let unReadMessages = 0;
    let chat = chats.find((chat) => chat._id === selectedChat?._id!);
    if (chat) {
      unReadMessages = chat.unreadCounts[currentUserData?._id!] || 0;
    }

    if (unReadMessages > 0) {
      ReadAllMessages({
        chatId: selectedChat?._id!,
        userId: currentUserData._id,
      });
    }

    socket.emit("read-all-messages", {
      chatId: selectedChat?._id!,
      readBy: currentUserData?._id!,
      users: selectedChat?.users
        .filter((user) => user._id !== currentUserData?._id!)
        .map((user) => user._id),
    });
  }, [messages]);

  useEffect(() => {
    socket.on("new-message-received", (message: IMessageType) => {
      if (selectedChat?._id === message.chat._id)
        setMessages((prev) => {
          const isMessageAlreadyExist = prev.find(
            (m) => m.socketId === message.socketId
          );
          if (isMessageAlreadyExist) return prev;
          else return [...prev, message];
        });
    });

    socket.on(
      "user-read-all-chat-messages",
      ({ chatId, readBy }: { chatId: string; readBy: string }) => {
        if (selectedChat?._id === chatId) {
          setMessages((prev) => {
            const NewMessages = prev.map((message: any) => {
              console.log(message);
              if (
                message?.sender._id !== readBy &&
                !message?.readBy.includes(readBy)
              ) {
                return {
                  ...message,
                  readBy: [...message.readBy, readBy],
                };
              }
              return message;
            });

            return NewMessages;
          });
        }
      }
    );
  }, [selectedChat]);

  return (
    <div className="flex-1 overflow-y-scroll" ref={messageRef}>
      {loading && (
        <div className="flex flex-col justify-center items-center mt-32 gap-3">
          <Spin></Spin>
        </div>
      )}
      <div className="flex flex-col gap-3 m-3">
        {!loading &&
          messages.length > 0 &&
          messages.map((message) => {
            return (
              <MessageCard message={message} key={message._id}></MessageCard>
            );
          })}
      </div>
    </div>
  );
};

export default Messages;
