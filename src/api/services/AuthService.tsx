import { AxiosResponse } from 'axios'
import { IAuth } from '../../shared/interfaces/userInterface/auth.interface'
import { AuthResponse } from '../../shared/response/authResponse.interface'
import { $API } from '../api'

export class authService {
	static async login(value: IAuth): Promise<AxiosResponse<AuthResponse>> {
		return $API.post<AuthResponse>('auth/login', value)
	}

	static async registration(
		value: IAuth,
	): Promise<AxiosResponse<AuthResponse>> {
		return $API.post<AuthResponse>('auth/registration', value)
	}

	static async logout(): Promise<void> {
		return $API.post('auth/logout')
	}

	static async refreshToken(): Promise<any> {
		return $API.get<any>('auth/refresh')
	}
}
