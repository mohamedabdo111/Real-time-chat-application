"use server";
import { ConnectMonogDB } from "@/config/db-config";
import User from "@/models/user-shcema";
import { currentUser } from "@clerk/nextjs/server";

ConnectMonogDB();
export const GetCurrentUserUsingMongoDB = async () => {
  const user = await currentUser();
  try {
    // if user already exists, update the user
    const mpngoUser = await User.findOne({
      clerkUserId: user?.id,
    });
    if (mpngoUser) return JSON.parse(JSON.stringify(mpngoUser));

    // if user does not exist, create the user
    const newUser = {
      clerkUserId: user?.id,
      name: user?.firstName + " " + user?.lastName,
      email: user?.emailAddresses[0]?.emailAddress,
      username: user?.username,
      profileImage: user?.imageUrl,
      bio: "",
    };
    const createNewUser = await User.create(newUser);

    return JSON.parse(JSON.stringify(createNewUser));
  } catch (error) {
    return {
      error: error,
    };
  }
};

export const GetAllUsers = async () => {
  try {
    const users = await User.find({});
    return JSON.parse(JSON.stringify(users));
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};
