import { IClassification } from '../../shared/interfaces/productInterface/classification.interface'
import { $API } from '../api'

export class classificationService {
	static async getAllClassifications(): Promise<Array<IClassification>> {
		return $API.get('classification').then(response => response.data)
	}
}
