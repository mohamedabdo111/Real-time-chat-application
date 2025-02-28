import React from "react";
import ChatHeader from "./chat-header";
import ChatList from "./chat-list";

const Chats = () => {
  return (
    <div className=" w-[400px] p-3">
      <ChatHeader></ChatHeader>
      <ChatList></ChatList>
    </div>
  );
};

export default Chats;
