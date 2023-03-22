import { $API } from '../api'

export class madeInService {
	static async getAllMadeIn(): Promise<Array<any>> {
		return $API.get<Array<any>>('made-in').then(response => response.data)
	}
}
