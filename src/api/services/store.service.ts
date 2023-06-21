import { IStoreHomeProducts } from '../../shared/interfaces/storeInterface/storeHomeProducts.interface'
import { $API } from '../api'

const STORE = 'store/'

export class storeService {
	static async getStoreHomeProducts(): Promise<Array<IStoreHomeProducts>> {
		return $API.get(`${STORE}home-products`).then(response => response.data)
	}
}
