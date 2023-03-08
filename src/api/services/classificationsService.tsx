import { $API } from '../api'

export class classificationService {
	static async getAllClassifications(): Promise<any> {
		return $API.get<any>('classification').then(response => response.data)
	}
}
