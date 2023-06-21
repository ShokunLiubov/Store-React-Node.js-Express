import { AxiosResponse } from 'axios'
import { IFiltersProducts } from '../../shared/filters/filtersProducts.interface'
import { IProduct } from '../../shared/interfaces/productInterface/product.interface'
import { IProductBasket } from '../../shared/interfaces/productInterface/productBasket.interface'
import { IProductResponse } from '../../shared/response/productResponse.interface'
import { $API } from '../api'

const PRODUCTS = 'products/'

export class productService {
	static async getProducts(
		page: number | string,
		sortField: string,
		sortOrder: string,
		filters: IFiltersProducts,
	): Promise<{ data: IProductResponse; url: string }> {
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

		let url = `?page=${page}&limit=12&sortField=${sortField}&sortOrder=${sortOrder}`

		if (search) {
			url += `&search=${search}`
		}

		if (category && category.length) {
			url += `&category=${category}`
		}

		if (gender && gender.length) {
			url += `&gender=${gender}`
		}

		if (type_of_aroma && type_of_aroma.length) {
			url += `&type_of_aroma=${type_of_aroma}`
		}

		if (country_of_TM && country_of_TM.length) {
			url += `&country_of_TM=${country_of_TM}`
		}

		if (made_in && made_in.length) {
			url += `&made_in=${made_in}`
		}

		if (classification && classification.length) {
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

		const response = await $API.get(PRODUCTS + url)
		return { data: response.data, url }
	}

	static async deleteProduct(productId: string): Promise<AxiosResponse> {
		return $API.delete(`${PRODUCTS}${productId}`)
	}

	static async createProduct(data: FormData): Promise<AxiosResponse> {
		return $API.post<IProduct>(PRODUCTS, data)
	}

	static async getProduct(productId: string): Promise<IProductBasket> {
		return $API.get(`${PRODUCTS}${productId}`).then(response => response.data)
	}

	static async getProductForEdit(productId: string): Promise<IProduct> {
		return $API
			.get(`${PRODUCTS}edit/${productId}`)
			.then(response => response.data.product)
	}

	static async updateProductEdit(
		product: FormData,
		productId: string,
	): Promise<AxiosResponse> {
		return $API.put(`${PRODUCTS}edit/${productId}`, product)
	}
}
