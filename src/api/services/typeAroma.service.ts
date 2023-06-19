import { $API } from '../api'

export class typeAromaService {
	static async getAllTypeAroma(): Promise<Array<string>> {
		return $API.get('type-aroma').then(response => response.data)
	}
}
