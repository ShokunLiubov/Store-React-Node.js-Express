import { AxiosResponse } from 'axios'
import { IUserInfo } from '../../shared/interfaces/userInterface/userInfo.interface'
import { IUserResponse } from '../../shared/response/userResponse.interface'
import { $API } from '../api'

const USERS = 'users'

export class userService {
	static async fetchUsers(
		page: number | string,
		sortField: string,
		sortOrder: string,
		filters: any,
	): Promise<{ data: IUserResponse; url: string }> {
		const { search, city } = filters

		let url = `?page=${page}&limit=15&sortField=${sortField}&sortOrder=${sortOrder}`

		if (search) {
			url += `&search=${search}`
		}

		if (city && city.length) {
			url += `&city=${city}`
		}

		const response = await $API.get('users' + url)
		return { data: response.data, url }
	}

	static async getUserInfoForDelivery(): Promise<AxiosResponse<IUserInfo>> {
		return $API.get(`${USERS}info`)
	}

	static async createUserInfoForDelivery(
		data: IUserInfo,
	): Promise<AxiosResponse<IUserInfo>> {
		return $API.post<IUserInfo>(`${USERS}info`, data)
	}

	static async updateUserInfoForDelivery(
		data: IUserInfo,
	): Promise<AxiosResponse<IUserInfo>> {
		return $API.put<IUserInfo>(`${USERS}info`, data)
	}

	static async getCity(): Promise<Array<string>> {
		return $API.get(`${USERS}city`).then(response => response.data)
	}
}
