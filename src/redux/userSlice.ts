import { IUserType } from "@/interfaces";
import { currentUser } from "@clerk/nextjs/server";
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUserData: null,
    onlineUsers: [],
    currentUserId: null,
  },
  reducers: {
    SetCurrentUser: (state, action) => {
      state.currentUserData = action.payload;
    },
    SetCurrentUserId: (state, action) => {
      state.currentUserId = action.payload;
    },
    SetOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
  },
});

export const { SetCurrentUser, SetCurrentUserId, SetOnlineUsers } =
  userSlice.actions;
export default userSlice;

export interface IStateUser {
  currentUserData: IUserType;
  onlineUsers: any;
  currentUserId: string;
}
