"use client";
import { IUserType } from "@/interfaces";
import { IStateUser } from "@/redux/userSlice";
import { CreateNewChat } from "@/server-action/chats";
import { Avatar, Button, Form, Input, message, Upload } from "antd";
import { useRouter } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

const GroupForm = ({ Users }: any) => {
  const [loading, setLoading] = React.useState(false);
  const [selectedUsersId, setSelectedUsersId] = React.useState<string[]>([]);
  const [selectedImage, setSelectedImage] = React.useState<any>(null);
  const router = useRouter();
  const { currentUserData }: IStateUser = useSelector(
    (state: any) => state.user
  );

  const onFinsh = async (values: any) => {
    try {
      setLoading(true);

      const payload = {
        groupName: values.groupName,
        groupeProfilePicture: selectedImage,
        groupBio: values.desctiption,
        users: [...selectedUsersId, currentUserData?._id!],
        createdBy: currentUserData?._id!,
        isGroupChat: true,
      };
      const response = await CreateNewChat(payload);
      if (response.error) throw new Error(response.error);
      message.success("Group Created Successfully");
      router.refresh();
      router.push("/");
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" grid grid-cols-2 gap-2">
      <div className=" flex flex-col gap-3 ">
        <span className="text-gray-500 font-semibold">
          Select Users to create group
        </span>
        {Users.map((user: IUserType) => {
          if (user._id === currentUserData?._id) return null;
          return (
            <div className="flex items-center gap-5 " key={user._id}>
              <input
                type="checkbox"
                name=""
                id=""
                placeholder="select this user"
                onChange={() => {
                  if (selectedUsersId.includes(user?._id)) {
                    setSelectedUsersId(
                      selectedUsersId.filter(
                        (userId: any) => userId !== user?._id
                      )
                    );
                  } else {
                    setSelectedUsersId([...selectedUsersId, user?._id]);
                  }
                }}
              />
              <Avatar src={user.profileImage}></Avatar>
              <span className=" text-gray-500 text-sm">{user.name}</span>
            </div>
          );
        })}
      </div>
      <div>
        <Form layout="vertical" onFinish={onFinsh}>
          <Form.Item
            name="groupName"
            label="Group Name"
            rules={[{ required: true, message: "Group Name is required" }]}
          >
            <Input></Input>
          </Form.Item>
          <Form.Item name="desctiption" label="Group Description">
            <Input.TextArea></Input.TextArea>
          </Form.Item>

          <Upload
            listType="picture-card"
            beforeUpload={(file) => {
              setSelectedImage(file);
              return false;
            }}
            maxCount={1}
          >
            <span className="p-2">Upload Group Image</span>
          </Upload>

          <div className="flex justify-end gap-4">
            <Button>Cancel</Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              Create Group
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default GroupForm;
