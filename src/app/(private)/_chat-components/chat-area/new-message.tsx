import socket from "@/config/socket-config";
import { IChatState } from "@/redux/chatSlice";
import { IStateUser } from "@/redux/userSlice";
import { CreateMessage } from "@/server-action/messages";
import { Button, message } from "antd";
import dayjs from "dayjs";
import { create } from "domain";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const NewMessage = () => {
  const [textmessage, setTextMessage] = React.useState<string>("");
  const { selectedChat }: IChatState = useSelector((state: any) => state.chat);
  const { currentUserData }: IStateUser = useSelector(
    (state: any) => state.user
  );
  const onSend = async () => {
    try {
      const commonPayload = {
        textmessage,
        image: "",
        createdAt: dayjs().toISOString(),
        updatedAt: dayjs().toISOString(),
      };
      const socketPayload = {
        ...commonPayload,
        chat: selectedChat!,
        sender: currentUserData!,
        socketId: dayjs.unix(Date.now() / 1000).toString(),
      };

      socket.emit("send-new-message", socketPayload);
      setTextMessage("");

      const dbPayload = {
        ...commonPayload,
        chat: selectedChat?._id!,
        sender: currentUserData?._id!,
      };
      await CreateMessage(dbPayload);
    } catch (error: any) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (selectedChat && textmessage.length > 0) {
      socket.emit("typing", {
        chat: selectedChat,
        senderId: currentUserData._id,
        senderName: currentUserData.name.split(" ")[0],
      });
    }
  }, [selectedChat, textmessage]);
  return (
    <div className="flex gap-3 p-3 border-0 border-t border-solid border-gray-200">
      <div>{/* createdBy */}</div>
      <div className=" flex-1">
        <input
          type="text"
          className="w-full h-10 p-3 outline-none focus:outline-none border-gray-200 border-solid borcer-[1px] focus:border-gray-500  text-base"
          placeholder="Type a message"
          onChange={(e) => setTextMessage(e.target.value)}
          value={textmessage}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSend();
            }
          }}
        />
      </div>
      <div>
        <Button
          type="primary"
          className="border-0 h-10 outline-none "
          onClick={onSend}
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default NewMessage;
