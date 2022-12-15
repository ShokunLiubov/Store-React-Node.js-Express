import { IUser } from "../interfaces/user.interface";

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}
