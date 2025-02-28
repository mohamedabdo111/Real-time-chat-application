export interface IUserType {
  _id: string;
  clerkUserId: string;
  name: string;
  email: string;
  username: string;
  profileImage: string;
  bio: string;
  createdAt: string;
  updatedAt: string;
}

export interface IChatType {
  _id: string;
  users: IUserType[];
  createdBy: IUserType;
  lastMessage: IMessageType;
  isGroupChat: boolean;
  groupName: string;
  groupeProfilePicture: string;
  groupBio: string;
  groupAdmins: IUserType[];
  unReadCount: any;
  createdAt: string;
  updatedAt: string;
}

export interface IMessageType {
  _id: string;
  chat: IChatType;
  sender: IUserType;
  textmessage: string;
  image: string;
  readBy: IUserType[];
  createdAt: string;
  updatedAt: string;
}
