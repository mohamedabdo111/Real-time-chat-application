import { IChatState } from "@/redux/chatSlice";
import { GetChatMessage } from "@/server-action/messages";
import { message, Spin } from "antd";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import MessageCard from "./message";
import { IMessageType } from "@/interfaces";
import socket from "@/config/socket-config";

const Messages = () => {
  const [messages, setMessages] = React.useState<IMessageType[]>([]);
  const [loading, setLoading] = React.useState(false);
  const { selectedChat }: IChatState = useSelector((state: any) => state.chat);

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
