import { ICategory } from '../../shared/interfaces/productInterface/category.interface'
import { $API } from '../api'

export class categoryService {
	static async getAllCategory(): Promise<Array<ICategory>> {
		return $API.get('category').then(response => response.data)
	}
}
