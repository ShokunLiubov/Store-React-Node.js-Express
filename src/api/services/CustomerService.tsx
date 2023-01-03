import { $API } from "../api";
import { AxiosResponse } from "axios";
import { AuthResponse } from "../../shared/response/authResponse.interface";
import { IUser } from "../../shared/interfaces/user.interface";

export class customerService {
  static async fetchUsers(): Promise<AxiosResponse<IUser[]>> {
    return $API.get<IUser[]>("auth/users");
  }
}
