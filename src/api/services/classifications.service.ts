import { IClassification } from '../../shared/interfaces/productInterface/classification.interface'
import { $API } from '../api'

const CLASSIFICATION = 'classification'

export class classificationService {
	static async getAllClassifications(): Promise<Array<IClassification>> {
		return $API.get(CLASSIFICATION).then(response => response.data)
	}
}
