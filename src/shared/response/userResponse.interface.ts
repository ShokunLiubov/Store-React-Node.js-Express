import { IUser } from '../interfaces/userInterface/user.interface'
import { IPaginatorResponse } from './paginatorResponse.interface'

export interface IUserResponse extends IPaginatorResponse {
  docs: IUser[]
}
