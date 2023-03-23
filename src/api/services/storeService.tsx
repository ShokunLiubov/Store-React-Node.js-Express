import { $API } from '../api'

export class storeService {
	static async getStoreHomeProducts(): Promise<Array<any>> {
		return $API
			.get<Array<any>>('store/home-products')
			.then(response => response.data)
	}
}
