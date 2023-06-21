import { AxiosResponse } from 'axios'
import { IAuth } from '../../shared/interfaces/userInterface/auth.interface'
import { AuthResponse } from '../../shared/response/authResponse.interface'
import { $API } from '../api'

const AUTH = 'auth/'

export class authService {
	static async login(value: IAuth): Promise<AxiosResponse<AuthResponse>> {
		return $API.post<AuthResponse>(`${AUTH}login`, value)
	}

	static async registration(
		value: IAuth,
	): Promise<AxiosResponse<AuthResponse>> {
		return $API.post<AuthResponse>(`${AUTH}registration`, value)
	}

	static async logout(): Promise<void> {
		return $API.post(`${AUTH}logout`)
	}

	static async refreshToken(): Promise<AxiosResponse<AuthResponse>> {
		return $API.get(`${AUTH}refresh`)
	}
}
