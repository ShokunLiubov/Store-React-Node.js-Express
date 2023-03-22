import { AxiosResponse } from 'axios'
import { IFiltersProducts } from '../../shared/filters/filtersProducts.interface'
import { IProduct } from '../../shared/interfaces/productInterface/product.interface'
import { IProductBasket } from '../../shared/interfaces/productInterface/productBasket.interface'
import { $API } from '../api'

export class productService {
	static async getProducts(
		page: number,
		sortField: string,
		sortOrder: string,
		filters: IFiltersProducts,
	): Promise<AxiosResponse<any>> {
		console.log()

		const {
			search,
			category,
			count,
			price,
			volume,
			type_of_aroma,
			country_of_TM,
			made_in,
			classification,
			gender,
		} = filters

		let url = `products?page=${page}&limit=12&sortField=${sortField}&sortOrder=${sortOrder}`

		if (search) {
			url += `&search=${search}`
		}

		if (category) {
			url += `&category=${category}`
		}

		if (gender) {
			url += `&gender=${gender}`
		}

		if (type_of_aroma) {
			url += `&type_of_aroma=${type_of_aroma}`
		}

		if (country_of_TM) {
			url += `&country_of_TM=${country_of_TM}`
		}

		if (made_in) {
			url += `&made_in=${made_in}`
		}

		if (classification) {
			url += `&classification=${classification}`
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

		if (volume) {
			const { $gte, $lte } = volume
			if ($gte && $lte) {
				url += `&volume[$gte]=${$gte}&volume[$lte]=${$lte}`
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
