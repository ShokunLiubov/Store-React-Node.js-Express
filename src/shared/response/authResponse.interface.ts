import { IUser } from "../interfaces/userInterface/user.interface"

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}
