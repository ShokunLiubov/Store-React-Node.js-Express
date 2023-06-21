import { IProduct } from '../../shared/interfaces/productInterface/product.interface'
import { $API } from '../api'

const PRODUCTS = 'products/'

export class productStoreService {
	static async getProductForPage(productId: string): Promise<IProduct> {
		return $API
			.get(`${PRODUCTS}product/${productId}`)
			.then(response => response.data)
	}
}
