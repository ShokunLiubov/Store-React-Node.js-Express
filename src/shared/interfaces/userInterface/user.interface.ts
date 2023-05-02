import { IUserInfo } from "./userInfo.interface"

export interface IUser {
  _id: string;
  username: string;
  roles: any;
  userInfo?: IUserInfo;
}

export interface IUserOptions extends Partial<IUser>{}