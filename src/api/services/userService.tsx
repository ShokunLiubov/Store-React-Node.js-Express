import { AxiosResponse } from 'axios'
import { IUserInfo } from '../../shared/interfaces/userInterface/userInfo.interface'
import { $API } from '../api'

export class userService {
	static async fetchUsers(
		page: number,
		sortField: string,
		sortOrder: string,
		filters: any,
	): Promise<AxiosResponse<any>> {
		const { search, city } = filters

		let url = `users?page=${page}&limit=15&sortField=${sortField}&sortOrder=${sortOrder}`

		if (search) {
			url += `&search=${search}`
		}

		if (city) {
			url += `&city=${city}`
		}

		return $API.get<any>(url)
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
