import { AxiosResponse } from 'axios'
import { IProduct } from '../../shared/interfaces/product.interface'
import { IProductBasket } from '../../shared/interfaces/productBasket.interface'
import { $API } from '../api'

export class productService {
	static async getProducts(
		page: number,
		sortField: string,
		sortOrder: string,
		filters: any,
	): Promise<AxiosResponse<any>> {
		const { search, category, count, price } = filters
		let url = `products?page=${page}&limit=12&sortField=${sortField}&sortOrder=${sortOrder}`
		if (search) {
			url += `&search=${search}`
		}
		if (category) {
			url += `&category=${category}`
		}
		if (count) {
			const { $gte, $lte } = count
			if ($gte && $lte) {
				url += `&count[$gte]=${$gte}&count[$lte]=${$lte}`
			}
		}
		if (price) {
			const { $gte, $lte } = price
			if ($gte && $lte) {
				url += `&price[$gte]=${$gte}&price[$lte]=${$lte}`
			}
		}

		return $API.get<any>(url)
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
		return $API.put(`products/edit/${productId}`, product)
	}
}
