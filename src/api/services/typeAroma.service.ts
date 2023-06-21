import { $API } from '../api'

const TYPE_AROMA = 'type-aroma'

export class typeAromaService {
	static async getAllTypeAroma(): Promise<Array<string>> {
		return $API.get(TYPE_AROMA).then(response => response.data)
	}
}
