import { IUser } from '../../shared/interfaces/userInterface/user.interface'
import { IUserInfo } from '../../shared/interfaces/userInterface/userInfo.interface'

export interface ISetAuth {
	type: string
	payload: IUser
}

export interface IOutAuth {
	type: string
}

export interface ISetLoading {
	type: string
	isLoading: boolean
}

export interface ISetUserInfo {
	type: string
	userInfo: IUserInfo
}
