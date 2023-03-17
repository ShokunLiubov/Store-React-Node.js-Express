import { IProduct } from '../../shared/interfaces/productInterface/product.interface'
import { $API } from '../api'

export class productStoreService {
	static async getProductForPage(productId: string): Promise<IProduct> {
		return $API
			.get(`products/product/${productId}`)
			.then(response => response.data)
	}
}
