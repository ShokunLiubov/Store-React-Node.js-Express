import { AxiosResponse } from 'axios'
import { IUserInfo } from '../../shared/interfaces/userInfo.interface'
import { $API } from '../api'

export class userService {
	static async fetchUsers(
		page: number,
		sortField: string,
		sortOrder: string,
	): Promise<AxiosResponse<any>> {
		return $API.get<any>(
			`users?page=${page}&limit=15&sortField=${sortField}&sortOrder=${sortOrder}`,
		)
	}

	static async getUserInfoForDelivery(): Promise<AxiosResponse<IUserInfo>> {
		return $API.get<IUserInfo>('users/info')
	}

	static async createUserInfoForDelivery(
		value: IUserInfo,
	): Promise<AxiosResponse<IUserInfo>> {
		return $API.post<IUserInfo>('users/info', value)
	}

	static async updateUserInfoForDelivery(
		value: IUserInfo,
	): Promise<AxiosResponse<IUserInfo>> {
		return $API.put<IUserInfo>('users/info', value)
	}
}
