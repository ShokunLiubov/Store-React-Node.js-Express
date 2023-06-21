import { ICategory } from '../../shared/interfaces/productInterface/category.interface'
import { $API } from '../api'

const CATEGORY = 'category'

export class categoryService {
	static async getAllCategory(): Promise<Array<ICategory>> {
		return $API.get(CATEGORY).then(response => response.data)
	}
}
