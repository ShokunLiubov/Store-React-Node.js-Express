import { IStoreHomeProducts } from '../../shared/interfaces/storeInterface/storeHomeProducts.interface'
import { $API } from '../api'

export class storeService {
	static async getStoreHomeProducts(): Promise<Array<IStoreHomeProducts>> {
		return $API.get('store/home-products').then(response => response.data)
	}
}
