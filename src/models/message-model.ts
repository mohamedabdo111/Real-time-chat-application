import mongoose from "mongoose";

const messageschema = new mongoose.Schema(
  {
    socketId: {
      type: String,
      default: "",
    },
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "chats",
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    textmessage: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
    readBy: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "users",
      default: [],
    },
  },
  { timestamps: true }
);

if (mongoose.models && mongoose.models["messages"]) {
  mongoose.deleteModel("messages");
}

const MessageModel = mongoose.model("messages", messageschema);
export default MessageModel;
