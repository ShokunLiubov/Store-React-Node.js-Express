import { AxiosResponse } from 'axios'
import { IProduct } from '../../shared/interfaces/product.interface'
import { IProductBasket } from '../../shared/interfaces/productBasket.interface'
import { $API } from '../api'

export class productService {
	static async getProducts(
		page: number,
		sortField: string,
		sortOrder: string,
	): Promise<AxiosResponse<any>> {
		return $API.get<any>(
			`products?page=${page}&limit=12&sortField=${sortField}&sortOrder=${sortOrder}`,
		)
	}

	static async deleteProduct(productId: string): Promise<AxiosResponse> {
		return $API.delete(`products/${productId}`)
	}

	static async createProduct(newProduct: IProduct): Promise<AxiosResponse> {
		return $API.post('products', newProduct)
	}

	static async getProduct(productId: string): Promise<IProductBasket> {
		return $API.get(`products/${productId}`).then(response => response.data)
	}

	static async getProductForEdit(productId: string): Promise<IProduct> {
		return $API
			.get(`products/edit/${productId}`)
			.then(response => response.data.product)
	}

	static async updateProductEdit(product: IProduct, productId: string) {
		// console.log(product)

		return $API.put(`products/edit/${productId}`, product)
	}
}
