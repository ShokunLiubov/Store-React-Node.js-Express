import { $API } from '../api'

export class categoryService {
	static async getAllCategory(): Promise<any> {
		return $API.get<any>('category').then(response => response.data)
	}
}
