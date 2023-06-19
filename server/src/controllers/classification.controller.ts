import { NextFunction, Request, Response } from 'express'
import Classification from '../models/Classification.model'

class classificationController {
	async getAllClassification(req: Request, res: Response, next: NextFunction) {
		try {
			const classifications = await Classification.find({}).select('name slug')

			return res.status(200).json(classifications)
		} catch (e) {
			console.error(e)
		}
	}
}

export default new classificationController()
