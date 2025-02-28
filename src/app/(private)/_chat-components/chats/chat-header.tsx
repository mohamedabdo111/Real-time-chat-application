import { Dropdown, MenuProps } from "antd";
import React, { useState } from "react";
import ChatModal from "./chat-modal";

const ChatHeader = () => {
  const [showModal, setShowModal] = useState(false);
  const items: MenuProps["items"] = [
    {
      label: "New chat",
      key: "1",
      onClick: () => setShowModal(true),
    },
    {
      label: "New group",
      key: "2",
    },
  ];

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-gray-500 text-xl font-bold uppercase">My chats</h1>
        {/* dropdown menu */}
        <Dropdown.Button className="w-max" size="small" menu={{ items }}>
          New
        </Dropdown.Button>
      </div>

      {showModal && (
        <ChatModal
          showModal={showModal}
          setIsModalOpen={setShowModal}
        ></ChatModal>
      )}
    </>
  );
};

export default ChatHeader;
