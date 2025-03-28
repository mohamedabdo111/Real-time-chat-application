export interface IUserType {
  _id: string;
  clerkUserId: string;
  name: string;
  email?: string;
  username: string;
  profileImage?: string;
  bio?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IChatType {
  _id: string;
  users: IUserType[];
  createdBy: IUserType | string;
  lastMessage: IMessageType;
  isGroupChat: boolean;
  groupName: string;
  groupeProfilePicture: string;
  groupBio: string;
  groupAdmins: IUserType[];
  unreadCounts: any;
  createdAt: string;
  updatedAt: string;
}

export interface IMessageType {
  socketId: string;
  _id: string;
  chat: IChatType;
  sender: IUserType;
  textmessage: string;
  image: string;
  readBy: IUserType[];
  createdAt: string;
  updatedAt: string;
}
