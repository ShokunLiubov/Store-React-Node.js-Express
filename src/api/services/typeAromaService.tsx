import { $API } from '../api'

export class typeAromaService {
	static async getAllTypeAroma(): Promise<Array<any>> {
		return $API.get<Array<any>>('type-aroma').then(response => response.data)
	}
}
