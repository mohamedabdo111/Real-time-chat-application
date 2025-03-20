"use client";
import { Divider } from "antd";
import ChatArea from "./(private)/_chat-components/chat-area";
import Chats from "./(private)/_chat-components/chats";

export default async function Page() {
  return (
    <div className="flex h-screen">
      <Chats></Chats>
      <Divider
        type="vertical"
        className="border-gray-400 h-full mx-0"
      ></Divider>
      <ChatArea></ChatArea>
    </div>
  );
}
