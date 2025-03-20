import { Dropdown, MenuProps } from "antd";
import React, { useState } from "react";
import ChatModal from "./chat-modal";
import { useRouter } from "next/navigation";

const ChatHeader = () => {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const items: MenuProps["items"] = [
    {
      label: "New chat",
      key: "1",
      onClick: () => setShowModal(true),
    },
    {
      label: "New group",
      key: "2",
      onClick: () => router.push("/group/create-group"),
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
      <input
        type="text"
        placeholder="Search about chat"
        className="w-full h-12 p-3 outline-none focus:outline-none border-gray-200 border-solid borcer-[1px] focus:border-gray-500 rounded-md text-base my-5 bg-gray-100"
      />

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
