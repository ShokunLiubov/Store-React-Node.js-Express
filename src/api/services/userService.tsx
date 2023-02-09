import { $API } from "../api";
import { AxiosResponse } from "axios";
import { AuthResponse } from "../../shared/response/authResponse.interface";
import { IUser } from "../../shared/interfaces/user.interface";
import { IUserInfo } from "../../shared/interfaces/userInfo.interface";

export class userService {
  static async fetchUsers(): Promise<AxiosResponse<IUser[]>> {
    return $API.get<IUser[]>("auth/users");
  }

  static async getUserInfoForDelivery(): Promise<AxiosResponse<IUserInfo>> {
    return $API.get<any>("users/info");
  }

  static async createUserInfoForDelivery(
    value: IUserInfo,
  ): Promise<AxiosResponse<IUserInfo>> {
    return $API.post<IUserInfo>("users/info", value);
  }

  static async updateUserInfoForDelivery(
    value: IUserInfo,
  ): Promise<AxiosResponse<IUserInfo>> {
    return $API.put<IUserInfo>("users/info", value);
  }
}
