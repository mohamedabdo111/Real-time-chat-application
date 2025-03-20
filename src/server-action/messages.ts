"use server";

import chatModel from "@/models/chat-model";
import MessageModel from "@/models/message-model";

export const CreateMessage = async (payload: {
  chat: string;
  sender: string;
  textmessage: string;
  image?: string;
}) => {
  try {
    const newMessage = await MessageModel.create(payload);
    await newMessage.save();

    const existingChat = await chatModel.findById(payload.chat);
    const existingChatUnread = existingChat?.unreadCounts;

    existingChatUnread?.users?.forEach((user: any) => {
      const userId = user.toString();
      if (userId !== payload.sender) {
        existingChatUnread[userId] = existingChatUnread[userId] || 0 + 1;
      }
    });
    await chatModel.findByIdAndUpdate(payload.chat, {
      lastMessage: newMessage,
      //   unreadCount: existingChatUnread,
    });
    return JSON.parse(JSON.stringify(newMessage));
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

export const GetChatMessage = async (chatId: string) => {
  try {
    const messages = await MessageModel.find({ chat: chatId }).populate(
      "sender"
    );
    return JSON.parse(JSON.stringify(messages));
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};
