import chatModel from "@/models/chat-model";
import Link from "next/link";
import React from "react";
import GroupForm from "./_components/group-form";
import User from "@/models/user-shcema";

const CreateGroup = async () => {
  const users = await User.find({});

  return (
    <div className="p-5">
      <Link
        href={"/"}
        className="px-7 p-3 text-primary border border-primary border-solid decoration-inherit block w-max "
      >
        <span> Back to chat</span>
      </Link>
      <h1 className="text-gray-500 text-xl py-3 uppercase">Create new group</h1>
      <GroupForm Users={users}></GroupForm>
    </div>
  );
};

export default CreateGroup;
