"use server";
import chatModel from "@/models/chat-model";

export const CreateNewChat = async (payload: any) => {
  try {
    await chatModel.create(payload);
    const newChat = await chatModel
      .find({
        users: {
          $in: [payload.createdBy],
        },
      })
      .populate("users")
      .sort({ updatedAt: -1 });
    return JSON.parse(JSON.stringify(newChat));
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

export const GetAllChats = async (userId: string) => {
  try {
    const chats = await chatModel
      .find({
        users: {
          $in: [userId],
        },
      })
      .populate("users")
      .populate("lastMessage")
      .populate("createdBy")
      .populate({
        path: "lastMessage",
        populate: {
          path: "sender",
        },
      })
      .sort({ updatedAt: -1 });
    return JSON.parse(JSON.stringify(chats));
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};
