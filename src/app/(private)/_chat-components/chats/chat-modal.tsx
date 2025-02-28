import { IUserType } from "@/interfaces";
import { IStateUser } from "@/redux/userSlice";
import { CreateNewChat } from "@/server-action/chats";
import { GetAllUsers } from "@/server-action/GetCurrentUserUsingMongoDB";
import { Avatar, Button, Divider, message, Modal, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ChatModal = ({
  showModal,
  setIsModalOpen,
}: {
  showModal: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [allUsers, setAllUsers] = useState<IUserType[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const { currentUserData }: IStateUser = useSelector(
    (state: any) => state.user
  );

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        setIsLoading(true);
        const response = await GetAllUsers();
        if (response.error) throw new Error(response.error);
        setAllUsers(response);
      } catch (error: any) {
        message.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    getAllUsers();
  }, []);

  const AddToChat = async (userId: string) => {
    try {
      setIsLoading(true);
      const response = await CreateNewChat({
        users: [currentUserData._id, userId],
        createdBy: currentUserData._id,
        isGroupChat: false,
      });
      setSelectedUserId(userId);
      if (response.error) throw new Error(response.error);
      message.success("Chat created successfully");
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setIsLoading(false);
      setIsModalOpen(false);
    }
  };
  return (
    <>
      <Modal
        open={showModal}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        centered
      >
        <div className="flex flex-col gap-3  text-md text-primary">
          <h1 className="text-center capitalize">Create new chat</h1>
          {isLoading && !selectedUserId && <Spin className="my-20"></Spin>}

          {!isLoading &&
            allUsers.length > 0 &&
            allUsers.map((user) => {
              if (user._id === currentUserData._id) return null;
              return (
                <>
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2 items-center">
                      <Avatar size={30} src={user.profileImage}></Avatar>
                      <span className="">{user.name}</span>
                    </div>
                    <Button
                      loading={isLoading && user._id === selectedUserId}
                      size="small"
                      onClick={() => AddToChat(user._id)}
                    >
                      Add to chat
                    </Button>
                  </div>
                  <Divider className="border-gray-200 my-[1px]"></Divider>
                </>
              );
            })}
        </div>
      </Modal>
    </>
  );
};

export default ChatModal;
