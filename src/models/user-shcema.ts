import { ConnectMonogDB } from "@/config/db-config";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    clerkUserId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    profileImage: {
      type: String,
      required: false,
    },
    bio: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

// if user already exists, update the user
if (mongoose.models && mongoose.models["users"]) {
  mongoose.deleteModel("users");
}

const User = mongoose.model("users", UserSchema);

export default User;
